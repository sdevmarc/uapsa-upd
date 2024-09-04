import { waveform } from 'ldrs'
import { getRandomLoadingMessage } from './loading-messages'

waveform.register()

export default function ScreenLoading() {
    return (
        <main className='z-[10] fixed top-0 left-0 w-full h-screen bg-white flex flex-col justify-center items-center gap-8 px-4'>
            <l-waveform
                size="35"
                stroke="3.5"
                speed="1"
                color="black"
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
