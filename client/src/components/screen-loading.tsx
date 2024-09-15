import { waveform } from 'ldrs'
import { getRandomLoadingMessage } from './loading-messages'
import { useState, useEffect } from 'react';

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
        <main className='z-[10] fixed top-0 left-0 w-full h-screen bg-background flex flex-col justify-center items-center gap-8 px-4'>
            <l-waveform
                size="35"
                stroke="3.5"
                speed="1"
                color={`${htmlClass === 'dark' ? 'white' : 'black'}`}
            ></l-waveform>
            <div className="flex flex-col gap-2">
                <h1 className='font-medium text-[1rem] text-primary text-center'>
                    Loading...
                </h1>
                <h1 className='font-semibold text-[1.2rem] text-primary text-center'>
                    {getRandomLoadingMessage()}
                </h1>
            </div>

        </main>
    )
}
