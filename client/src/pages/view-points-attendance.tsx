import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ViewPointsAttendance() {
    return (
        <>
            <div className="w-full h-screen flex justify-evenly items-center">
                <form className="w-1/2 h-full flex flex-col justify-center items-center px-4">
                    <aside className='w-full h-full bg-background flex flex-col justify-center items-center gap-[2rem]'>
                        <div className="flex flex-col items-center">
                            <h1 className="text-[1.5rem] font-bold">Search</h1>
                            <p className="text-sm font-normal">Want to view your status? Search with your ID number below.</p>
                        </div>
                        <div className="w-full flex justify-center items-center gap-2">
                            <Input id='search' placeholder='Search here...' className='max-w-[70%]' required />
                            <Button variant={`outline`} size={`sm`} type="submit">
                                Search
                            </Button>
                        </div>

                    </aside>
                </form>

                <aside className='w-[50%] h-full bg-accent flex flex-col justify-center items-center px-4'>
                    {/* <h1 className="text-[2rem] font-semibold">
                        Your status will show here.
                    </h1> */}
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="w-full flex flex-col justify-center items-center gap-7">
                            <div className="flex flex-col justify-center items-center">
                                <h1 className='text-md font-normal'>Points</h1>
                                <h1 className='text-[7rem] font-semibold'>
                                    21
                                </h1>
                            </div>

                            <div className="flex flex-col justify-center items-center">
                                <h1 className='text-[3rem] font-semibold'>
                                    Hello
                                </h1>
                            </div>
                            <div className="w-full flex flex-col justify-center items-center gap-4">
                                <div className="w-full flex justify-evenly items-center">
                                    <div className="flex flex-col justify-center items-center">
                                        <h1 className='text-md font-normal'>Attended</h1>
                                        <h1 className="text-xl font-semibold">
                                            21
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </>
    )
}
