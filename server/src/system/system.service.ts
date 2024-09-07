import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IHeader, IPromiseSystemUI, ISystemUI } from './system.interface';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class SystemService {
    constructor(
        @InjectModel('SystemUi') private readonly SystemModel: Model<ISystemUI>,
        private readonly cloudinaryService: CloudinaryService
    ) { }


    // async UpdateTitle({ id, headerTitle, headerIcon }: IHeader)
    //     : Promise<IPromiseSystemUI> {
    //     const ispublic_id = await this.SystemModel.findOne({ public_id: id })
    //     if(ispublic_id) return {success: false, message}
    //     const system_isicon = await this.SystemModel.findOne({ 'header.headerIcon': headerIcon })
    //     const cloudinary_isicon = await this.cloudinaryService.getImagesFromFolder.
    //         if(!isicon) return { success: true, message: 'Header updated successfully!', url: isicon.header.headerIcon }

    //     await this.cloudinaryService.uploadFile(headerIcon)

    //     const response = await this.SystemModel.findOneAndUpdate(
    //         { 'header.headerIcon': headerIcon },
    //         {
    //             'header.headerTitle': headerTitle,
    //             'header.headerIcon': headerIcon
    //         },
    //         { new: true }
    //     )

    //     return { success: true, message: 'Header updated successfully!', url: response.header.headerIcon }
    // }

    async UpdateLoginBg({ public_id, loginBgImage }: ISystemUI)
        : Promise<IPromiseSystemUI> {
        const response = await this.SystemModel.findOneAndUpdate(
            { public_id },
            { loginBgImage },
            { new: true, upsert: true }
        )
        console.log(response)
        return { success: true, message: 'Background image updated successfully!', imageId: '', url: '' }
    }
}
