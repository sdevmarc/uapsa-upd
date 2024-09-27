interface ISystemHeader {
    header_icon_public_id: string
    header_icon_url: string
}

interface ISystemSignIn {
    bg_image_public_id: string
    bg_image_url: string
}

export interface ISystemUI {
    index?: number
    header_title?: string
    header_icon?: ISystemHeader
    sign_in?: ISystemSignIn
}

export interface IPromiseSystemUI {
    success: boolean
    message: string
}