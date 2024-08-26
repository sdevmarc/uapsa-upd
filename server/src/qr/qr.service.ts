import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IQr } from './qr.interface';

@Injectable()
export class QrService {
    constructor(
        @InjectModel('Qr')
        private readonly QrModel: Model<IQr>
    ) { }

    async findAll()
        : Promise<{ success: boolean, message: string, data: IQr[] }> {
        const data = await this.QrModel.find()
        if (data.length <= 0) return { success: true, message: 'No exisisting qr users!', data }
        return { success: true, message: 'Qr users retrieved successfully!', data }
    }

    async findOne({ idNumber }: { idNumber: string })
        : Promise<{ success: boolean, message: string, data: IQr }> {
        const data = await this.QrModel.findOne({ idNumber })
        if (!data) return { success: true, message: 'Cannot find qr user!', data }
        return { success: true, message: 'Qr user data retrieved successfully!', data }
    }

    async InsertQr({ idNumber, name, degree }: IQr)
        : Promise<{ success: boolean, message: string }> {
        await this.QrModel.create({ idNumber, name, degree })
        return { success: true, message: 'Qr created successfully!' }
    }

    async DeleteQr({ idNumber }: { idNumber: string })
        : Promise<{ success: boolean, message: string }> {
        await this.QrModel.deleteOne({ idNumber })
        return { success: true, message: 'Qr deleted successfully!' }
    }

    async ResetQr()
        : Promise<{ success: boolean, message: string }> {
        await this.QrModel.deleteMany({})
        return { success: true, message: 'Qr resetted successfully!' }
    }
}
