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

    async InsertQr({ idNumber, name, degree }: IQr)
        : Promise<{ success: boolean, message: string }> {
        await this.QrModel.create({ idNumber, name, degree })
        return { success: true, message: 'Qr created successfully!' }
    }
}
