import { Injectable } from '@nestjs/common';
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
        : Promise<{ success: boolean, message: string }> {
        const isqr = await this.QrModel.findById(qr)
        if (!isqr) return { success: false, message: 'Qr is not registered.' }
        await this.PointModel.findOneAndUpdate(
            { qr },
            { $inc: { points: 1 } },
            { new: true, upsert: true }
        )
        return { success: true, message: 'Point added to the user successfully!' }
    }

    async LessPoint({ qr }: { qr: string })
        : Promise<{ success: boolean, message: string }> {
        const isqr = await this.QrModel.findById(qr)
        if (!isqr) return { success: false, message: 'Qr is not registered.' }
        await this.PointModel.findOneAndUpdate(
            { qr },
            { $inc: { points: -1 } },
            { new: true, upsert: true }
        )
        return { success: true, message: 'Point resetted successfully!' }
    }

    async ResetPoints()
        : Promise<{ success: boolean, message: string }> {
        await this.PointModel.deleteMany({})
        return { success: true, message: 'Points resetted successfully!' }
    }
}
