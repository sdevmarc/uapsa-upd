import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BlurImage from '@/assets/BlurBlob.png'
import ScreenLoading from '@/components/screen-loading'
import '@fontsource/fredoka-one'
import { API_FIND_SYSTEM_UI } from '@/api'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
    const [imageloading, setImageLoading] = useState<boolean>(true)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token) return navigate('/dashboard')
    }, [token, navigate])

    const { data: systemui, isLoading: systemuiLoading, isFetched: systemuiFetched } = useQuery({
        queryFn: () => API_FIND_SYSTEM_UI(),
        queryKey: ['systemui']
    })

    return (
        <>
            <div className="relative overflow-hidden w-full h-screen flex flex-col justify-start items-center">
                {(imageloading || systemuiLoading) && <ScreenLoading />}
                <img src={BlurImage} alt="Blur Image Assets" className="absolute top-[-5rem] left-[-10rem] w-[20rem] h-[20rem] scale-[4]" loading='lazy' onLoad={() => setImageLoading(false)} onError={() => setImageLoading(false)} />
                <img src={BlurImage} alt="Blur Image Asset" className="absolute top-[-5rem] right-[-10rem] w-[20rem] h-[20rem] scale-[4]" loading='lazy' onLoad={() => setImageLoading(false)} onError={() => setImageLoading(false)} />
                <img src={BlurImage} alt="Blur Image Asset" className="absolute top-[50rem] left-[30rem] w-[20rem] h-[20rem] scale-[4]" loading='lazy' onLoad={() => setImageLoading(false)} onError={() => setImageLoading(false)} />
                <div className="z-[1] w-full h-full max-w-[90rem] px-4">
                    <main className="w-full h-full flex flex-col justify-center items-center gap-4">
                        <h1 className='text-center text-[4rem] sm:text-[4rem] md:text-[4rem] lg:text-[5rem] xl:text-[5rem] font-semibold text-primary font-fredoka'>
                            {
                                systemuiFetched &&
                                systemui?.data?.header_title || 'PON-HUB'
                            }
                        </h1>
                        <p className='text-sm text-primary text-center'>
                            Track attendance and points effortlessly with a click. Simple, smart, and always on top!
                        </p>
                        <Link to={`/signin`} className='text-sm text-primary px-8 py-2 hover:bg-accent rounded-full duration-300 ease-in-out border-[2px] border-black/20 dark:border-white/20'>
                            Sign In
                        </Link>
                    </main>
                </div>
            </div>
        </>
    )
}