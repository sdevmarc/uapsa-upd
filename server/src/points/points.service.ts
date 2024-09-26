import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPoints } from './points.interface';
import { IQr } from 'src/qr/qr.interface';

@Injectable()
export class PointsService {
    constructor(
        @InjectModel('Point') private readonly PointModel: Model<IPoints>,
        @InjectModel('Qr') private readonly QrModel: Model<IQr>,
    ) { }

    async InsertPoint({ qr }: { qr: string })
        : Promise<{ success: boolean, message: string, qr?: string }> {
        try {
            const decoded_base64 = this.decodeBase64(qr)

            const isqr = await this.QrModel.findById(decoded_base64)
            if (!isqr) return { success: false, message: 'Qr is not registered.' }
            await this.PointModel.findOneAndUpdate(
                { qr: decoded_base64 },
                { $inc: { points: 1 } },
                { new: true, upsert: true }
            )
            return { success: true, message: 'Point added to the user successfully!', qr: isqr._id.toString() }
        } catch (error) {
            throw new HttpException({ success: false, message: 'Qr user data failed to insert.', error }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async LessPoint({ qr }: { qr: string })
        : Promise<{ success: boolean, message: string }> {
        try {
            const isqr = await this.QrModel.findById(qr)
            if (!isqr) return { success: false, message: 'Qr is not registered.' }
            await this.PointModel.findOneAndUpdate(
                { qr },
                { $inc: { points: -1 } },
                { new: true, upsert: true }
            )
            return { success: true, message: 'Point resetted successfully!' }
        } catch (error) {
            throw new HttpException({ success: false, message: 'Qr user data failed to less point.', error }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async ResetPoints()
        : Promise<{ success: boolean, message: string }> {
        try {
            await this.PointModel.deleteMany({})
            return { success: true, message: 'Points resetted successfully!' }
        } catch (error) {
            throw new HttpException({ success: false, message: 'Qr user data failed to reset points.', error }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    decodeBase64(encodedData: string): string {
        return Buffer.from(encodedData, 'base64').toString('utf-8');
    }

    removeBaseUrl(data: string): string {
        const baseUrl = `${process.env.SERVER_HOST}`
        return data.replace(baseUrl, '')
    }
}
