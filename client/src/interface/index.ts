interface IComboBox {
    value: string
    label: string
}

export interface IFCChildren {
    bg?: string
    title?: string
    link?: string
    description?: string
    children?: React.ReactNode
    type?: (e: string | undefined) => void
    value?: string
    lists?: IComboBox[]
}

export interface IAvatar {
    image: string
    initials: string
}

export interface IFormUser {
    name: string
    email: string
    password: string
}

export interface IAPIDashboard {
    idNumber?: string
    name?: string
    points?: string
    attended?: string
}