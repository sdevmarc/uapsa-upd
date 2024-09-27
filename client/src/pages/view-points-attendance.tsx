import { API_FIND_IDNUMBER } from "@/api";
import ScreenLoading from "@/components/screen-loading";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotFoundPage from "./error-not-found";

export default function ViewPointsAttendance() {
    const { qr } = useParams<{ qr: string }>();
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token) return navigate('/dashboard')
    }, [token, navigate]);

    const { data: qruser, isLoading: qrLoading, isFetched: qrFetched } = useQuery({
        queryFn: () => API_FIND_IDNUMBER({ qr }),
        queryKey: ['qrstatus', { qr }],
        enabled: !!qr
    })

    return (
        <>
            {
                qrLoading ? <ScreenLoading /> :
                    (qrFetched && !qruser) ? <NotFoundPage />
                        : <div className="w-full h-screen bg-background flex justify-center items-center">
                            <div className="w-full max-w-[90rem] h-full px-4 flex justify-center items-center">
                                {qrLoading && <ScreenLoading />}
                                {(qrFetched && qruser.success) &&
                                    <div className="w-full h-full flex flex-col justify-center items-center">
                                        <div className="w-full h-full flex justify-center items-center">
                                            <div className="w-full flex flex-col justify-center items-center gap-7">
                                                <div className="flex flex-col justify-center items-center">
                                                    <h1 className='text-md font-normal'>Points</h1>
                                                    <h1 className='text-[7rem] font-semibold'>
                                                        {qruser.data.points || '---'}
                                                    </h1>
                                                </div>

                                                <div className="flex flex-col justify-center items-center">
                                                    <h1 className='text-[3rem] font-semibold'>
                                                        {qruser.data.name || '---'}
                                                    </h1>
                                                </div>
                                                <div className="w-full flex flex-col justify-center items-center gap-4">
                                                    <div className="w-full flex justify-evenly items-center">
                                                        <div className="flex flex-col justify-center items-center">
                                                            <h1 className='text-md font-normal'>Attended</h1>
                                                            <h1 className="text-xl font-semibold">
                                                                {qruser.data.attended || '---'}
                                                            </h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
            }

        </>
    )
}
