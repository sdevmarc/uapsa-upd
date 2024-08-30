import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { API_SIGN_IN } from "@/api"
import { useState } from "react"

export default function SignIn() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    const { mutateAsync: QuerySignInUser, isPending: SignInloading } = useMutation({
        mutationFn: API_SIGN_IN,
        onSuccess: (data) => {
            if (!data.success) return navigate('/signup')
            if (data.success) return navigate('/dashboard')
        }
    })

    const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        QuerySignInUser({ email: values.email, password: values.password })
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setValues((prev) => ({
            ...prev,
            [name]: value
        }))
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
                        <label htmlFor="email" className='text-sm'>
                            Email
                        </label>
                        <Input placeholder="eg. m@example.com" className="placeholder:text-muted placeholder:text-sm text-sm" id="email" name="email" onChange={handleOnChange} required />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="password" className="text-sm">
                            Password
                        </label>
                        <Input id="password" required name="password" className="text-sm" onChange={handleOnChange} />
                    </div>
                    <Button type="submit" variant={`default`} className="w-full" >
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
