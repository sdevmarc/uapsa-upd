import { waveform } from 'ldrs'
import { useState, useEffect } from 'react';
import Cycling from '@/assets/cycling-man.svg'

waveform.register()

export default function ScreenLoading() {
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
        <main className='z-[10] fixed top-0 left-0 w-full h-screen bg-background flex flex-col justify-center items-center gap-3 px-4'>
            <div className="w-[10rem] h-[10rem] overflow-hidden">
                <img src={Cycling} alt="Loading image" className='w-full h-full object-cover' />
            </div>
            <l-waveform
                size="35"
                stroke="3.5"
                speed="1"
                color={`${htmlClass === 'dark' ? 'white' : 'black'}`}
            ></l-waveform>
            <h1 className='font-medium text-[1rem] text-primary text-center'>
                Hold on... I'm loading
            </h1>
        </main>
    )
}
