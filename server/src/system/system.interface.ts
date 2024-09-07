export interface IHeader {
    id?: string
    headerTitle: string
    headerIcon: Express.Multer.File | string
}

export interface ISystemUI {
    public_id: string
    loginBgImage?: Express.Multer.File
    header?: IHeader
}


export interface IPromiseSystemUI {
    success: boolean
    message: string
    imageId?: string
    url?: string
}