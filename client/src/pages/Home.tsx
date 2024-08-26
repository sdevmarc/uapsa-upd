import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';
import BlurYellow from '@/assets/Blur Ellipse.png'
import BlurBlack from '@/assets//Blur Black.png'
import { Link } from 'react-router-dom';

export default function Home() {
    const [isScanning, setIsScanning] = useState<boolean>(true);

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
                    <div className=" flex flex-col justify-center items-center">
                        <h1 className='text-[4rem] font-bold'>
                            SCAN HERE
                        </h1>
                        <div className="scale-x-[-1] rounded-xl shadow-[_0_10px_15px_-3px_rgba(0,0,0,0.2)] overflow-hidden">
                            <Scanner onScan={handleScan} allowMultiple />
                        </div>
                    </div>
                </div>
                <div className="w-1/2 h-full flex flex-col justify-start items-center px-10">
                    <header className="w-full h-[4rem] flex justify-end items-center">
                        <Link to={`/`} className='px-5 py-2 bg-accent rounded-lg text-sm text-primary-foreground shadow-[_0_10px_15px_-3px_rgba(0,0,0,0.1)] hover:scale-[.98] duration-300 ease-in-out'>
                            Sign In
                            </Link>
                    </header>
                    <div className="w-full h-full flex justify-center items-center">
                        <h1 className='text-[3rem] font-semibold'>
                            Your details here.
                        </h1>
                    </div>

                </div>
            </div>
        </>
    )
}