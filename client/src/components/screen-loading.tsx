import { waveform } from 'ldrs'
import { useState, useEffect } from 'react';
import Cycling from '@/assets/cycling-man.svg'

waveform.register()

export default function ScreenLoading() {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [htmlClass, setHtmlClass] = useState('');

    useEffect(() => {
        // Get the initial class
        const htmlTag = document.documentElement;
        setHtmlClass(htmlTag.className);

        // Set up a MutationObserver to watch for class changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    setHtmlClass(htmlTag.className);
                }
            });
        });

        observer.observe(htmlTag, { attributes: true });

        // Clean up
        return () => observer.disconnect();
    }, []);

    return (
        <>
            {
                isLoading ?
                    <div className="fixed top-0 left-0 w-full h-screen bg-background flex justify-center items-center z-[5]">
                        <div className="w-full h-full max-w-[90rem] px-4 flex flex-col justify-center items-center">
                            <l-waveform
                                size="20"
                                stroke="2.5"
                                speed="1"
                                color={`${htmlClass === 'dark' ? 'white' : 'black'}`}
                            ></l-waveform>
                            <h1 className='text-md font-medium text-center'>
                                Hold on... I'm loading
                            </h1>
                        </div>
                    </div >
                    :
                    <div className="fixed top-0 left-0 w-full h-screen bg-background flex justify-center items-center z-[5]">
                        <div className="w-full h-full max-w-[90rem] px-4 flex flex-col justify-center items-center gap-4">
                            <div className="w-[20%] flex justify-center items-center">
                                <img src={Cycling} alt="Loading image" className='w-full h-full object-contain' loading='lazy' onLoad={() => setLoading(false)} onError={() => setLoading(false)} />
                            </div>
                            <h1 className='text-md font-medium text-center'>
                                Hold on... I'm loading
                            </h1>
                            <l-waveform
                                size="20"
                                stroke="2.5"
                                speed="1"
                                color={`${htmlClass === 'dark' ? 'white' : 'black'}`}
                            ></l-waveform>
                        </div>
                    </div >
            }
        </>
    )
}
