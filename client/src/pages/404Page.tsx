import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import BlurImage from '@/assets/BlurBlob.png'
import ErrorPage from '@/assets/404.json'
import { useLottie } from "lottie-react"

const ErrorImage = () => {
    const options = {
        animationData: ErrorPage,
        loop: true,
        style: { width: '20rem', height: '20rem' }
    };
    const { View } = useLottie(options);
    return View
};

export default function NotFoundPage() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token) { navigate('/dashboard') }
    }, [token, navigate]);

    return (
        <>
            <div className="relative overflow-hidden bg-background w-full h-screen flex flex-col justify-start items-center">
                <img src={BlurImage} alt="Blur Image Asset" className="absolute top-[-5rem] left-[-10rem] w-[20rem] h-[20rem] scale-[4]" />
                <img src={BlurImage} alt="Blur Image Asset" className="absolute top-[-5rem] right-[-10rem] w-[20rem] h-[20rem] scale-[4]" />
                <img src={BlurImage} alt="Blur Image Asset" className="absolute top-[50rem] left-[30rem] w-[20rem] h-[20rem] scale-[4]" />
                <div className="z-[1] w-full h-full max-w-[90rem]">
                    <main className="w-full h-full flex justify-evenly items-center">
                        <div className="w-full h-full flex flex-col justify-center items-center gap-4">
                            <ErrorImage />
                            <h1 className='text-center text-[2rem] sm:text-[2rem] md:text-[2rem] lg:text-[3rem] xl:text-[3rem] font-semibold text-primary'>
                                Page not found
                            </h1>
                            <p className='text-sm text-primary text-center'>
                                The content you're seeking has gone on an adventure, and we're not sure when it'll return."
                            </p>
                            <Link to={`/`} className='text-sm text-primary px-8 py-2 hover:bg-accent hover:border-none rounded-full duration-300 ease-in-out border-[2px] border-black/20 dark:border-white/20'>
                                Go Back
                            </Link>
                        </div>
                    </main>
                </div>

            </div>
        </>
    )
}