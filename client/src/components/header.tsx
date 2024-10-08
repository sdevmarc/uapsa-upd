import React from 'react'
import { UserAvatar } from './user-avatar'
import { ModeToggle } from './moon-toggle'

export default function Header({ children }: { children?: React.ReactNode }) {
    return (
        <div className="z-[2] fixed top-0 w-full h-[4rem] flex justify-center items-center border-b bg-background">
            <div className="w-full h-full max-w-[90rem] flex justify-between items-center px-4">
                <nav className='flex gap-2 items-center'>
                    <h1 className='px-4 font-semibold text-primary flex items-center gap-4 font-fredoka'>
                        PON-HUB
                    </h1>
                    {children}
                </nav>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                    <UserAvatar image='https://github.com/shadcn.png' initials='CN' />
                </div>
            </div>
        </div>
    )
}
