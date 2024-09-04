export interface IUsers {
    id?: string
    name?: string
    email?: string
    password?: string
    isactive?: boolean
    role?: string
}

export interface IPromiseUsers {
    success: boolean
    message: string
    data?: IUsers[] | {}
    access_token?: string
}