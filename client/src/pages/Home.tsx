import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import BlurImage from '@/assets/BlurBlob.png'
import ScreenLoading from '@/components/screen-loading';
import '@fontsource/fredoka-one';
import GradientText from '@/components/react-bits/gradient-text';

export default function Home() {
    const [imageloading, setImageLoading] = useState<boolean>(true)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token) return navigate('/dashboard')
    }, [token, navigate]);

    return (
        <>
            <div className="relative overflow-hidden w-full h-screen flex flex-col justify-start items-center">
                {imageloading && <ScreenLoading />}
                <img src={BlurImage} alt="Blur Image Asset" className="absolute top-[-5rem] left-[-10rem] w-[20rem] h-[20rem] scale-[4]" loading='lazy' onLoad={() => setImageLoading(false)} onError={() => setImageLoading(false)} />
                <img src={BlurImage} alt="Blur Image Asset" className="absolute top-[-5rem] right-[-10rem] w-[20rem] h-[20rem] scale-[4]" loading='lazy' onLoad={() => setImageLoading(false)} onError={() => setImageLoading(false)} />
                <img src={BlurImage} alt="Blur Image Asset" className="absolute top-[50rem] left-[30rem] w-[20rem] h-[20rem] scale-[4]" loading='lazy' onLoad={() => setImageLoading(false)} onError={() => setImageLoading(false)} />
                <div className="z-[1] w-full h-full max-w-[90rem] px-4">
                    <main className="w-full h-full flex flex-col justify-center items-center gap-4">
                        <h1 className='text-center text-[4rem] sm:text-[4rem] md:text-[4rem] lg:text-[5rem] xl:text-[5rem] font-semibold text-primary font-fredoka'>
                            PON-HUB
                        </h1>
                        <p className='text-sm text-primary text-center'>
                            Track attendance and points effortlessly with a click. Simple, smart, and always on top!
                        </p>
                        <div className="flex flex-col items-center gap-4">
                            <Link to={`/signin`} className='text-sm text-primary px-8 py-2 hover:bg-accent rounded-full duration-300 ease-in-out border-[2px] border-black/20 dark:border-white/20'>
                                Sign In
                            </Link>
                            <Link to={`/viewstatus`} >
                                <GradientText
                                    colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                                    animationSpeed={3}
                                    showBorder={true}
                                    className='px-8 py-2 text-sm'
                                >
                                    View Status
                                </GradientText>
                            </Link>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}