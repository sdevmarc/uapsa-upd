export interface IQr {
    idNumber?: string
    name?: string
    qr?: string
}

export interface IPromiseQr {
    success?: boolean
    message?: string
    qr?: string | {}
    data?: IQr[] | {}
}