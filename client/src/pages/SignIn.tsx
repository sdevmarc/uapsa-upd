import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"

export default function SignIn() {
    const navigate = useNavigate()

    const handleSignIn = () => {
        navigate('/dashboard')
    }

    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <>
            <div className="w-full h-screen flex justify-center items-center">
                <form onSubmit={handleSignIn} className="w-[35%] h-full flex flex-col justify-center items-center px-[5rem] gap-4">
                    <h1 className='text-[2rem] font-bold'>Sign In</h1>
                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="email" className=''>
                            Email
                        </label>
                        <Input placeholder="eg. m@example.com" className="placeholder:text-muted" id="email" required />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="password" className=''>
                            Password
                        </label>
                        <Input id="password" required />
                    </div>
                    <Button type="submit" variant={`default`} className="w-full">
                        Sign In
                    </Button>
                    <Button onClick={handleGoBack} type="button" variant={`outline`} className="w-full">
                        Go back
                    </Button>
                </form>
                <div className="w-[65%] h-full bg-black">
                </div>
            </div>
        </>
    )
}
