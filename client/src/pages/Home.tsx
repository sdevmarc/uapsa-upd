import { Button } from '@/components/ui/button'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token) { navigate('/dashboard') }
    }, [token, navigate]);

    return (
        <>
            <div className="w-full h-screen flex flex-col justify-start items-center">
                <div className="w-full max-w-[90rem] px-4">
                    <Header />
                </div>
            </div>
        </>
    )
}

const Header = () => {
    const navigate = useNavigate()

    const handleSignIn = () => {
        navigate('/signin')
    }

    return (
        <header className="w-full h-[4rem] flex justify-end items-center">
            <Button onClick={handleSignIn} variant={`default`}>
                Sign In
            </Button>
        </header>
    )
}
