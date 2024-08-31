import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import { API_SIGN_UP, API_USER_EXIST } from "@/api"
import { useEffect, useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function SignUp() {
    const [values, setValues] = useState({
        idNumber: '',
        name: '',
        degree: '',
        email: '',
        password: ''
    })
    const [confirm, setConfirm] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()

    const { data: userExist, isLoading: userexistLoading } = useQuery({
        queryFn: () => API_USER_EXIST(),
        queryKey: ['signupUserExist']
    })

    useEffect(() => {
        if(!userexistLoading && !userExist.success) return navigate('/signin')
    }, [userExist, navigate])

    const { mutateAsync: QuerySignUpUser, isPending: SignUpLoading } = useMutation({
        mutationFn: API_SIGN_UP,
        onSuccess: (data) => {
            if (!data.success) return alert(data.message)
            if (data.success) {
                alert(data.message)
                navigate('/signin')
            }
        }
    })

    const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (confirm !== values.password) return alert('Passwords do not match!')
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

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    return (
        <>
            <div className="w-full h-screen flex justify-center items-center">
                <form onSubmit={handleSignUp} className="w-[35%] h-full flex flex-col justify-center items-center px-[5rem] gap-4 overflow-auto">
                    <h1 className='text-[2rem] font-bold'>Sign Up</h1>
                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="idNumber" className='text-sm'>
                            ID Number
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
                        <div className="relative">
                            <Input
                                id="password"
                                required
                                name="password"
                                className="pr-10"
                                type={showPassword ? "text" : "password"}
                                onChange={handleOnChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={toggleShowPassword}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-gray-400" />
                                ) : (
                                    <Eye className="h-4 w-4 text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="confirmPassword" className='text-sm'>
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                required
                                className="pr-10"
                                type={showConfirmPassword ? "text" : "password"}
                                onChange={handleChangeConfirm}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={toggleShowConfirmPassword}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4 text-gray-400" />
                                ) : (
                                    <Eye className="h-4 w-4 text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>
                    <Button type="submit" variant="default" className="w-full" disabled={SignUpLoading}>
                        {SignUpLoading ? 'Signing Up...' : 'Sign Up'}
                    </Button>
                    <Button onClick={handleGoBack} type="button" variant="outline" className="w-full">
                        Go back
                    </Button>
                </form>
                <div className="w-[65%] h-full bg-black">
                </div>
            </div>
        </>
    )
}