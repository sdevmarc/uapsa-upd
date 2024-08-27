import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

export default function Header() {
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/')
    }

    return (
        <div className="sticky top-0 w-full h-[4rem] flex justify-center items-center border-b bg-background z-[1]">
            <div className="w-full h-full max-w-[90rem] flex justify-between items-center px-4">
                <nav className='flex gap-2 items-center'>
                    <Link to={`/`} className='italic bg-accent px-4 font-bold text-primary-foreground'>
                        MLP
                    </Link>
                    <Link to={`/`} className='text-md font-medium'>
                        QR
                    </Link>
                    <Link to={`/`} className='text-md font-medium'>
                        Attendance
                    </Link>
                    <Link to={`/`} className='text-md font-medium'>
                        Management
                    </Link>
                </nav>
                <Button onClick={handleLogout} variant={`default`}>
                    Logout
                </Button>
            </div>
        </div>
    )
}
