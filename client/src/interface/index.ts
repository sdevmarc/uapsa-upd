export interface IFCChildren {
    title?: string
    link?: string
    description?: string
    children?: React.ReactNode
    type?: (e: string | undefined) => void
    value?: string
}

export interface IAvatar {
    image: string
    initials: string
} 