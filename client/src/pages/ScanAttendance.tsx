import Header from "@/components/header";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { API_INDEX } from "@/api";
import { useNavigate } from "react-router-dom";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";

export default function ScanAttendance() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [isScanning, setIsScanning] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!token) { navigate('/') }
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Adjust this time as needed

        return () => clearTimeout(timer);
    }, [token, navigate]);

    const { data: jwtAuthorized, isFetched: jwtFetched, isLoading: jwtLoading } = useQuery({
        queryFn: () => API_INDEX({ token: token ?? '' }),
        queryKey: ['dashboardJwt', { token: token ?? '' }],
        enabled: !!token
    })

    useEffect(() => {
        if (jwtFetched && !jwtAuthorized) { navigate('/') }
    }, [jwtFetched, jwtAuthorized, navigate]);

    const handleScan = (detectedCodes: IDetectedBarcode[]) => {
        if (detectedCodes) {
            console.log(detectedCodes)
            setIsScanning(false);

            setTimeout(() => {
                setIsScanning(true);
            }, 1000);
        }
    };

    return (
        <>
            <div className="w-full h-screen flex justify-center items-center">
                <Header />
                <div className="z-[1] w-1/2 h-full pt-[6rem] px-4 pb-4 flex flex-col justify-center items-center">
                    <div className="w-full h-full flex flex-col justify-center items-center gap-3">
                        <h1 className='text-[2rem] font-bold'>
                            SCAN FOR ATTENDANCE
                        </h1>
                        <div className="scale-x-[-1] rounded-xl shadow-[_0_10px_15px_-3px_rgba(0,0,0,0.2)] overflow-hidden">
                            {isLoading ? (
                                <div className="w-[640px] h-[480px] flex justify-center items-center bg-gray-200">
                                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                                </div>
                            ) : (
                                <Scanner onScan={handleScan} allowMultiple />
                            )}
                        </div>
                    </div>
                </div>
                <div className="z-[1] w-1/2 h-full flex flex-col justify-start items-center px-10">
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="w-full flex flex-col justify-center items-center gap-7">
                            <div className="flex flex-col justify-center items-center">
                                <h1 className='text-md font-normal'>Points</h1>
                                <h1 className='text-[7rem] font-semibold'>55</h1>
                            </div>

                            <div className="flex flex-col justify-center items-center">
                                <h1 className='text-[3rem] font-semibold'>John Doe</h1>
                                <h1 className='text-[1.4rem] font-semibold'>BSIT - 4</h1>
                            </div>
                            <div className="w-full flex flex-col justify-center items-center gap-4">
                                <div className="w-full flex justify-evenly items-center">
                                    <div className="flex flex-col justify-center items-center">
                                        <h1 className='font-semibold'>Attended</h1>
                                        <h1>5</h1>
                                    </div>
                                    <div className="flex flex-col justify-center items-center">
                                        <h1 className='font-semibold'>Absences</h1>
                                        <h1>5</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}