import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import HeadSection, { BackHeadSection, SubHeadSectionDetails } from '@/components/head-section';

export default function Settings() {
    return (
        <>
            <div className="flex flex-col min-h-screen items-center">
                <Header />
                <div className="w-full max-w-[90rem] flex flex-col pb-[20rem]">
                    <HeadSection>
                        <BackHeadSection />
                        <SubHeadSectionDetails
                            title="SETTINGS"
                            description="A page for editing your system ui preferences."
                        />
                    </HeadSection>
                    <main className="flex justify-end py-4">
                        <UpdateSettings />
                    </main>
                </div>
            </div>
        </>
    )
}

const UpdateSettings = () => {
    return (
        <form className="w-[80%] flex flex-col justify-start gap-4 rounded-lg border">
            <div className="w-full px-4 py-3 border-b">
                <h1 className='text-text font-semibold text-lg'>Configuration</h1>
            </div>
            <div className="w-full py-2 flex flex-col justify-between">
                <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-col px-4 gap-1">
                        <h1 className='text-[.83rem]'>Website Title</h1>
                        <Input
                            name='header_title'
                            type='text'
                            placeholder='eg. pon-hub'
                            required
                        />
                    </div>
                    <div className="flex justify-start items-center px-4 gap-4">
                        <h1 className='text-[.83rem]'>Header Icon</h1>
                        <label className="cursor-pointer flex items-center justify-center bg-accent hover:bg-accent-foreground text-sm text-primary-foreground font-medium py-2 px-3 rounded-md transition duration-200 ease-in-out">
                            <span>Upload Image</span>
                            <input type="file" className="hidden" />
                        </label>
                    </div>
                    <div className="flex justify-start items-center px-4 gap-4">
                        <h1 className='text-[.83rem]'>Sign In Nackground Image</h1>
                        <label className="cursor-pointer flex items-center justify-center bg-accent hover:bg-accent-foreground text-sm text-primary-foreground font-medium py-2 px-3 rounded-md transition duration-200 ease-in-out">
                            <span>Upload Image</span>
                            <input type="file" className="hidden" />
                        </label>
                    </div>
                </div>
                <div className="w-full flex items-center justify-end px-4 pt-4 pb-2">
                    <Button type='submit' variant={`default`} size={`default`} className='text-primary-foreground'>
                        UPDATE
                    </Button>
                </div>
            </div>
        </form>
    )
}