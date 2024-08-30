import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { API_SIGN_IN, API_SIGN_UP } from "@/api"
import { useState } from "react"

export default function SignUp() {
    const [values, setValues] = useState({
        idNumber: '',
        name: '',
        degree: '',
        email: '',
        password: ''
    })
    const [confirm, setConfirm] = useState('')
    const navigate = useNavigate()

    const { mutateAsync: QuerySignUpUser, isPending: SignInloading } = useMutation({
        mutationFn: API_SIGN_UP,
        onSuccess: (data) => {
            if (!data.success) return alert(data.message)
            if (data.success) alert(data.message); return navigate('/signin')
        }
    })

    const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (confirm !== values.password) return alert('Password do not match!')
        QuerySignUpUser({
            idNumber: values.idNumber,
            name: values.name,
            degree: values.degree,
            email: values.email,
            password: values.password
        })
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleChangeConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirm(e.target.value)
    }

    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <>
            <div className="w-full h-screen flex justify-center items-center">
                <form onSubmit={handleSignUp} className="w-[35%] h-full flex flex-col justify-center items-center px-[5rem] gap-4 overflow-auto">
                    <h1 className='text-[2rem] font-bold'>Sign Up</h1>
                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="idNumber" className='text-sm'>
                            Id Number
                        </label>
                        <Input placeholder="eg. 00012323" className="placeholder:text-muted placeholder:text-sm" id="idNumber" name="idNumber" onChange={handleOnChange} required />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="name" className='text-sm'>
                            Name
                        </label>
                        <Input placeholder="eg. John Doe" className="placeholder:text-muted placeholder:text-sm" id="name" name="name" onChange={handleOnChange} required />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="degree" className='text-sm'>
                            Course
                        </label>
                        <Input placeholder="eg. BS--" className="placeholder:text-muted placeholder:text-sm" id="degree" name="degree" onChange={handleOnChange} required />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="email" className='text-sm'>
                            Email
                        </label>
                        <Input placeholder="eg. m@example.com" className="placeholder:text-muted placeholder:text-sm" id="email" name="email" onChange={handleOnChange} required />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="password" className='text-sm'>
                            Password
                        </label>
                        <Input id="password" required name="password" onChange={handleOnChange} />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="confirmpassword" className='text-sm'>
                            Confirm Password
                        </label>
                        <Input id="passconfirmpasswordword" required onChange={handleChangeConfirm} />
                    </div>
                    <Button type="submit" variant={`default`} className="w-full" >
                        Sign Up
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
