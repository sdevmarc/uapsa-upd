export interface ISystemHeader {
    public_id?: string
    headerTitle?: string
    headerIconFile?: Express.Multer.File
    headerIconUrl?: string
}

export interface ISystemSignIn {
    id?: string
    public_id?: string
    bgImageFile?: Express.Multer.File
    bgImageUrl?: string
}

export interface IPromiseSystemUI {
    success: boolean
    message: string
    public_id?: string
    url?: string
}