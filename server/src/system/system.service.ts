import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPromiseSystemUI, ISystemUI } from './system.interface';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class SystemService {
    constructor(
        @InjectModel('SystemUI') private readonly SystemModel: Model<ISystemUI>,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    // async findOneSystemUIHeader({ public_id }: ISystemHeader)
    //     : Promise<IPromiseSystemUI> {
    //     try {
    //         const isicon = await this.SystemModel.findOne({ public_id })
    //         if (!isicon) return { success: false, message: 'Header icon does not exist.' }

    //         return { success: true, message: 'Header icon exist.', url: isicon.headerIconUrl }
    //     } catch (error) {
    //         throw new HttpException({ success: false, message: error }, HttpStatus.INTERNAL_SERVER_ERROR)
    //     }
    // }

    // async findOneSystemUISignIn({ public_id }: ISystemHeader)
    //     : Promise<IPromiseSystemUI> {
    //     try {
    //         const isicon = await this.SystemModel.findOne({ public_id })
    //         if (!isicon) return { success: false, message: 'Header icon does not exist.' }

    //         return { success: true, message: 'Header icon exist.', url: isicon.bgImageUrl }
    //     } catch (error) {
    //         throw new HttpException({ success: false, message: error }, HttpStatus.INTERNAL_SERVER_ERROR)
    //     }
    // }

    async updateHeaderTitle({ header_title }: { header_title: string }): Promise<IPromiseSystemUI> {
        try {
            await this.SystemModel.findOneAndUpdate(
                { index: 1, },
                {
                    header_title
                },
                { new: true, upsert: true }
            )
            return { success: true, message: 'Settings updated successfully.' }
        } catch (error) {
            throw new HttpException({ success: false, message: error }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateHeaderIcon({ header_icon_file }: { header_icon_file: Express.Multer.File }): Promise<IPromiseSystemUI> {
        try {
            const uploadimage = await this.cloudinaryService.uploadFile(header_icon_file)
            if (!uploadimage) return { success: false, message: 'Header failed to update.' }

            const { public_id, secure_url } = uploadimage
            await this.SystemModel.findOneAndUpdate(
                { index: 1, },
                {
                    'header_icon.header_icon_url': secure_url,
                    'header_icon.header_icon_public_id': public_id
                },
                { new: true, upsert: true }
            )
            return { success: true, message: 'Settings updated successfully.' }
        } catch (error) {
            throw new HttpException({ success: false, message: error }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateSignInBG({ bg_image_file }: { bg_image_file: Express.Multer.File }): Promise<IPromiseSystemUI> {
        try {
            const uploadimage = await this.cloudinaryService.uploadFile(bg_image_file)
            if (!uploadimage) return { success: false, message: 'Background image icon failed to update.' }

            const { public_id, secure_url } = uploadimage
            await this.SystemModel.findOneAndUpdate(
                { index: 1, },
                {
                    'sign_in.bg_image_url': secure_url,
                    'sign_in.bg_image_public_id': public_id,
                },
                { new: true, upsert: true }
            )
            return { success: true, message: 'Settings updated successfully.' }
        } catch (error) {
            throw new HttpException({ success: false, message: error }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    //     async upsertHeaderTitle({ headerTitle, headerIconFile }: ISystemHeader)
    //         : Promise<IPromiseSystemUI> {
    //         try {
    //             const uploadimage = await this.cloudinaryService.uploadFile(headerIconFile)

    //             await this.SystemModel.findOneAndUpdate(
    //                 { index: 1 },
    //                 {
    //                     index: 1,
    //                     'header.public_id': uploadimage.public_id,

    //                 }
    //             )

    //             await this.SystemModel.create({
    //                 public_id: uploadimage.public_id,
    //                 headerTitle,
    //                 headerIconUrl: uploadimage.secure_url
    //             })

    //             return { success: true, message: 'Header ui created successfully!' }
    //         } catch (error) {
    //             throw new HttpException({ success: false, message: error }, HttpStatus.INTERNAL_SERVER_ERROR)
    //         }
    //     }

    //     async upsertHeaderIcon({ headerTitle, headerIconFile }: ISystemHeader)
    //     : Promise<IPromiseSystemUI> {
    //     try {
    //         const uploadimage = await this.cloudinaryService.uploadFile(headerIconFile)

    //         await this.SystemModel.findOneAndUpdate(
    //             { index: 1 },
    //             {
    //                 index: 1,
    //                 'header.public_id': uploadimage.public_id,

    //             }
    //         )

    //         await this.SystemModel.create({
    //             public_id: uploadimage.public_id,
    //             headerTitle,
    //             headerIconUrl: uploadimage.secure_url
    //         })

    //         return { success: true, message: 'Header ui created successfully!' }
    //     } catch (error) {
    //         throw new HttpException({ success: false, message: error }, HttpStatus.INTERNAL_SERVER_ERROR)
    //     }
    // }

    //     async InsertSystemUIHeader({ headerTitle, headerIconFile }: ISystemHeader)
    //         : Promise<IPromiseSystemUI> {
    //         try {
    //             const uploadimage = await this.cloudinaryService.uploadFile(headerIconFile)

    //             await this.SystemModel.findOneAndUpdate(
    //                 { index: 1 },
    //                 {
    //                     index: 1,
    //                     'header.public_id': uploadimage.public_id,

    //                 }
    //             )

    //             await this.SystemModel.create({
    //                 public_id: uploadimage.public_id,
    //                 headerTitle,
    //                 headerIconUrl: uploadimage.secure_url
    //             })

    //             return { success: true, message: 'Header ui created successfully!' }
    //         } catch (error) {
    //             throw new HttpException({ success: false, message: error }, HttpStatus.INTERNAL_SERVER_ERROR)
    //         }
    //     }

    //     async InsertSystemUISignIn({ bgImageFile }: ISystemSignIn)
    //         : Promise<IPromiseSystemUI> {s
    //         try {
    //             const uploadimage = await this.cloudinaryService.uploadFile(bgImageFile)

    //             await this.SystemModel.create({
    //                 public_id: uploadimage.public_id,
    //                 bgImageUrl: uploadimage.secure_url
    //             })

    //             return { success: true, message: 'Background image updated successfully!' }
    //         } catch (error) {
    //             throw new HttpException({ success: false, message: error }, HttpStatus.INTERNAL_SERVER_ERROR)
    //         }
    //     }
}
