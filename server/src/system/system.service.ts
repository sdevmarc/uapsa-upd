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

    async getSystemUi(): Promise<IPromiseSystemUI> {
        try {
            const response = await this.SystemModel.findOne({ index: 1 })
            return { success: true, message: 'System ui fetched successfully!', data: response }
        } catch (error) {
            throw new HttpException({ success: false, message: error }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateHeaderTitle({ header_title }: { header_title: string }): Promise<IPromiseSystemUI> {
        try {
            await this.SystemModel.findOneAndUpdate(
                { index: 1, },
                {
                    header_title
                },
                { new: true, upsert: true }
            )
            return { success: true, message: 'Header title updated successfully.' }
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
            return { success: true, message: 'Header icon updated successfully.' }
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
            return { success: true, message: 'Background image updated successfully.' }
        } catch (error) {
            throw new HttpException({ success: false, message: error }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateUI({ header_title, header_icon_file, bg_image_file }): Promise<IPromiseSystemUI> {
        try {
            let update_header_icon_file, update_bg_image_file, update_header_title;

            // Update icon file if provided
            if (header_icon_file) {
                update_header_icon_file = await this.updateHeaderIcon({ header_icon_file });
                if (!update_header_icon_file?.success) return update_header_icon_file;
            }

            // Update background image if provided
            if (bg_image_file) {
                update_bg_image_file = await this.updateSignInBG({ bg_image_file });
                if (!update_bg_image_file?.success) return update_bg_image_file;
            }

            // Update header title if provided
            if (header_title) {
                update_header_title = await this.updateHeaderTitle({ header_title });
                if (!update_header_title?.success) return update_header_title;
            }

            // If all updates were successful
            return { success: true, message: 'Settings updated successfully.' };
        } catch (error) {
            throw new HttpException({ success: false, message: error }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
