export interface IQRSchema {
    _id?: string
    idNumber?: string | string[]
    name?: string
    attended?: string
    points?: string | number
}

export interface IManagementSchema {
    _id?: string
    name?: string
    degree?: string
    email?: string
    role?: string
}