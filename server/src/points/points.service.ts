import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPoints } from './points.interface';

@Injectable()
export class PointsService {
    constructor(
        @InjectModel('Point')
        private readonly PointModel: Model<IPoints>
    ) { }

    async InsertPoint({ qr }: { qr: string })
        : Promise<{ success: boolean, message: string }> {
        await this.PointModel.findOneAndUpdate(
            { qr },
            { $inc: { points: 1 } },
            { new: true, upsert: true }
        )
        return { success: true, message: 'Point added to the user successfully!' }
    }

    async LessPoint({ qr }: { qr: string })
        : Promise<{ success: boolean, message: string }> {
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
