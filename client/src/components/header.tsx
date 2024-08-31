import React from 'react'
import { UserAvatar } from './user-avatar'
import Image from '@/assets/donkey-logo.png'

export default function Header({ children }: { children?: React.ReactNode }) {
    return (
        <div className="z-[2] fixed top-0 w-full h-[4rem] flex justify-center items-center border-b bg-background">
            <div className="w-full h-full max-w-[90rem] flex justify-between items-center px-4">
                <nav className='flex gap-2 items-center'>
                    <h1 className='px-4 font-semibold text-primary flex items-center gap-4'>
                        My Little Ponky <img src={Image} alt="donkey" className='w-[1rem] h-full object-contain' />
                    </h1>
                    {children}
                </nav>
                <UserAvatar image='https://github.com/shadcn.png' initials='CN' />
            </div>
        </div>
    )
}
