import { API_FIND_IDNUMBER } from "@/api";
import ScreenLoading from "@/components/screen-loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ViewPointsAttendance() {
    const [query, setQuery] = useState<string>('')
    const [values, setValues] = useState({
        name: '',
        points: '',
        attended: ''
    })
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token) return navigate('/dashboard')
    }, [token, navigate]);

    const { mutateAsync: qruser, isPending: qrLoading } = useMutation({
        mutationFn: API_FIND_IDNUMBER,
        onSuccess: (data) => {
            if (!data.success) return toast("Uh, oh! Something went wrong.", { description: data.message })
            return setValues((prev) => ({
                ...prev,
                name: data.data.name,
                points: data.data.points,
                attended: data.data.attended
            }))
        }
    })

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setQuery(value)
    }

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await qruser({ idNumber: query })
    }

    return (
        <>
            <header className="absolute top-0 left-0 w-full h-[4rem] flex justify-center items-center px-4">
                <div className="h-full w-full max-w-[90rem] flex justify-start items-center hover:underline text-sm">
                    <Link to={`/`}>
                        Go back
                    </Link>
                </div>
            </header>
            <div className="w-full h-screen flex justify-evenly items-center">
                {qrLoading && <ScreenLoading />}
                <form onSubmit={handleSearch} className="w-1/2 h-full flex flex-col justify-center items-center px-4">
                    <aside className='w-full h-full bg-background flex flex-col justify-center items-center gap-[2rem]'>
                        <div className="flex flex-col items-center">
                            <h1 className="text-[1.5rem] font-bold">Search</h1>
                            <p className="text-sm font-normal">Want to view your status? Search with your ID number below.</p>
                        </div>
                        <div className="w-full flex justify-center items-center gap-2">
                            <Input disabled={qrLoading} id='search' placeholder='Search here...' onChange={handleOnChange} className='max-w-[70%]' required />
                            <Button variant={`outline`} size={`sm`} type="submit">
                                Search
                            </Button>
                        </div>

                    </aside>
                </form>

                <aside className='w-[50%] h-full flex flex-col justify-center items-center px-4'>
                    {
                        <div className="w-full h-full flex justify-center items-center">
                            <div className="w-full flex flex-col justify-center items-center gap-7">
                                <div className="flex flex-col justify-center items-center">
                                    <h1 className='text-md font-normal'>Points</h1>
                                    <h1 className='text-[7rem] font-semibold'>
                                        {values.points || '---'}
                                    </h1>
                                </div>

                                <div className="flex flex-col justify-center items-center">
                                    <h1 className='text-[3rem] font-semibold'>
                                        {values.name || '---'}
                                    </h1>
                                </div>
                                <div className="w-full flex flex-col justify-center items-center gap-4">
                                    <div className="w-full flex justify-evenly items-center">
                                        <div className="flex flex-col justify-center items-center">
                                            <h1 className='text-md font-normal'>Attended</h1>
                                            <h1 className="text-xl font-semibold">
                                                {values.attended || '---'}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </aside>
            </div>
        </>
    )
}
