import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPromiseSystemUI, ISystemHeader, ISystemSignIn } from './system.interface';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class SystemService {
    constructor(
        @InjectModel('SystemHeaderUI') private readonly HeaderModel: Model<ISystemHeader>,
        @InjectModel('SystemSignInUI') private readonly SignInModel: Model<ISystemSignIn>,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    async findOneSystemUIHeader({ public_id }: ISystemHeader)
        : Promise<IPromiseSystemUI> {
        try {
            const isicon = await this.HeaderModel.findOne({ public_id })
            if (!isicon) return { success: false, message: 'Header icon does not exist.' }
            return { success: true, message: 'Header icon exist.', url: isicon.headerIconUrl }
        } catch (error) {
            throw new HttpException({ success: false, message: error }, HttpStatus.BAD_REQUEST)
        }
    }

    async findOneSystemUISignIn({ public_id }: ISystemHeader)
        : Promise<IPromiseSystemUI> {
        try {
            const isicon = await this.SignInModel.findOne({ public_id })
            if (!isicon) return { success: false, message: 'Header icon does not exist.' }
            return { success: true, message: 'Header icon exist.', url: isicon.bgImageUrl }
        } catch (error) {
            throw new HttpException({ success: false, message: error }, HttpStatus.BAD_REQUEST)
        }
    }

    // async updateSystemUIHeader()
    // : Promise<IPromiseSystemUI> {}

    async InsertSystemUIHeader({ headerTitle, headerIconFile }: ISystemHeader)
        : Promise<IPromiseSystemUI> {
        try {
            const uploadimage = await this.cloudinaryService.uploadFile(headerIconFile)

            await this.HeaderModel.create({
                public_id: uploadimage.public_id,
                headerTitle,
                headerIconUrl: uploadimage.secure_url
            })

            return { success: true, message: 'Header ui created successfully!' }
        } catch (error) {
            throw new HttpException({ success: false, message: error }, HttpStatus.BAD_REQUEST)
        }
    }

    async InsertSystemUISignIn({ bgImageFile }: ISystemSignIn)
        : Promise<IPromiseSystemUI> {
        try {
            const uploadimage = await this.cloudinaryService.uploadFile(bgImageFile)

            await this.SignInModel.create({
                public_id: uploadimage.public_id,
                bgImageUrl: uploadimage.secure_url
            })

            return { success: true, message: 'Background image updated successfully!' }
        } catch (error) {
            throw new HttpException({ success: false, message: error }, HttpStatus.BAD_REQUEST)
        }
    }
}
