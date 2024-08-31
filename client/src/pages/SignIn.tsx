import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { API_SIGN_IN } from "@/api"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function SignIn() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const { mutateAsync: QuerySignInUser, isPending: SignInloading } = useMutation({
        mutationFn: API_SIGN_IN,
        onSuccess: (data) => {
            if (!data.success) return navigate('/signup')
            if (data.success) {
                localStorage.setItem('token', data.access_token)
                return navigate('/dashboard')
            }
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
        navigate('/')
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
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
                        <Input 
                            placeholder="eg. m@example.com" 
                            className="placeholder:text-muted placeholder:text-sm text-sm" 
                            id="email" 
                            name="email" 
                            onChange={handleOnChange} 
                            required 
                        />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="password" className="text-sm">
                            Password
                        </label>
                        <div className="relative">
                            <Input 
                                id="password" 
                                required 
                                name="password" 
                                className="text-sm pr-10" 
                                onChange={handleOnChange} 
                                type={showPassword ? "text" : "password"}
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
                    <Button type="submit" variant="default" className="w-full" disabled={SignInloading}>
                        {SignInloading ? 'Signing In...' : 'Sign In'}
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