import { waveform } from 'ldrs'

waveform.register()

export default function ScreenLoading() {
    return (
        <main className='z-[10] fixed top-0 left-0 w-full h-screen bg-black/80 flex justify-center items-center'>
            <l-waveform
                size="35"
                stroke="3.5"
                speed="1"
                color="white"
            ></l-waveform>
        </main>
    )
}
