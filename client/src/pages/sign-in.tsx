import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import { API_FIND_SYSTEM_UI, API_SIGN_IN, API_USER_EXIST } from "@/api"
import { useEffect, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import ScreenLoading from "@/components/screen-loading"
import bg_signin from '@/assets/sapiens.svg'

export default function SignIn() {
    const [imageloading, setImageLoading] = useState<boolean>(true)
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token) return navigate('/dashboard')
    }, [token, navigate]);


    const { data: userexist, isLoading: userexistLoading, isFetched: userFetched } = useQuery({
        queryFn: () => API_USER_EXIST(),
        queryKey: ['signinUserExist']
    })

    const { mutateAsync: QuerySignInUser, isPending: SignInloading } = useMutation({
        mutationFn: API_SIGN_IN,
        onSuccess: (data) => {
            if (!data.success) return toast("Oops, Something went wrong!", { description: data.message })
            localStorage.setItem('token', data.access_token)
            return navigate('/dashboard')
        },
        onError: () => {
            toast("Oops, something went wrong!", { description: 'Please check your credentials, try again!' })
        }
    })

    const { data: systemui, isLoading: systemuiLoading, isFetched: systemuiFetched } = useQuery({
        queryFn: () => API_FIND_SYSTEM_UI(),
        queryKey: ['systemui']
    })

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (userFetched && !userexist.success) return navigate('/signup')
        return await QuerySignInUser({ email: values.email, password: values.password })
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
            <div className="w-full h-screen flex justify-between items-center">
                {(SignInloading || imageloading || userexistLoading || systemuiLoading) && <ScreenLoading />}
                <form onSubmit={handleSignIn} className="w-full md:w-[45%] lg:w-[35%] flex justify-center items-center overflow-auto">
                    <div className="w-full max-w-[40rem] h-full flex flex-col justify-center items-center px-4 gap-4">
                        {
                            systemuiFetched &&
                            <div className="w-[60%] sm:flex sm:justify-center sm:items-center md:hidden">
                                <img src={systemui.data?.sign_in.bg_image_url || bg_signin} alt="Image Background" className="object-contain w-full h-full" loading="lazy" onLoad={() => setImageLoading(false)} />
                            </div>
                        }

                        <h1 className='text-[2rem] font-bold'>Sign In</h1>
                        <div className="w-full flex flex-col gap-1">
                            <label htmlFor="email-input" className='text-sm'>
                                Email
                            </label>
                            <Input
                                type="email-input"
                                placeholder="eg. m@example.com"
                                className="placeholder:text-muted placeholder:text-sm text-sm"
                                id="email"
                                name="email"
                                onChange={handleOnChange}
                                required
                            />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <label htmlFor="password-input" className="text-sm">
                                Password
                            </label>
                            <div className="relative">
                                <Input
                                    id="password-input"
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
                    </div>
                </form>
                <div className="hidden lg:w-[65%] h-full sm:hidden md:w-[55%] md:flex md:justify-center md:items-center lg:flex lg:justify-center lg:items-center">
                    {
                        systemuiFetched &&
                        <div className="w-full h-[80%] flex justify-center items-center">
                            <img src={systemui.data?.sign_in.bg_image_url || bg_signin} alt="Image Background" className="object-contain w-full h-full" loading='lazy' onLoad={() => setImageLoading(false)} onError={() => setImageLoading(false)} />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}