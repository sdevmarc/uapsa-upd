import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import { useEffect, useState } from 'react';
import BlurYellow from '@/assets/Blur Ellipse.png'
import { Link } from 'react-router-dom';

export default function Home() {
    const [isScanning, setIsScanning] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Adjust this time as needed

        return () => clearTimeout(timer);
    }, []);

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
            <div className="relative w-full h-screen bg-background flex overflow-hidden">
                <img src={BlurYellow} alt="Blur Image Asset" className="absolute top-[-10rem] left-[-20rem] w-[20rem] h-[20rem] scale-[4]" />
                <img src={BlurYellow} alt="Blur Image Asset" className="absolute bottom-[-5rem] right-[-10rem] w-[20rem] h-[20rem] scale-[4]" />
                <div className="z-[1] w-1/2 h-full p-14 flex flex-col justify-center items-center">
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <h1 className='text-[4rem] font-bold'>
                            SCAN HERE
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
                    <header className="w-full h-[4rem] flex justify-end items-center">
                        <Link to={`/signin`} className='px-5 py-2 bg-accent rounded-lg text-sm text-primary-foreground shadow-[_0_10px_15px_-3px_rgba(0,0,0,0.1)] hover:scale-[.98] duration-300 ease-in-out'>
                            Sign In
                        </Link>
                    </header>
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