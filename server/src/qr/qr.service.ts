import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { IQr } from './qr.interface';
import { IAttendance } from 'src/attendance/attendance.interface';
import { IPoints } from 'src/points/points.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class QrService {
    constructor(
        @InjectModel('Qr') private readonly QrModel: Model<IQr>,
        @InjectModel('Attendance') private readonly AttendanceModel: Model<IAttendance>,
        @InjectModel('Point') private readonly PointModel: Model<IPoints>
    ) { }

    async findAll()
        : Promise<{ success: boolean, message: string, data: IQr[] }> {
        const data = await this.QrModel.find()
        if (data.length <= 0) return { success: true, message: 'No exisisting qr users!', data }
        return { success: true, message: 'Qr users retrieved successfully!', data }
    }

    async findOne({ qr }: { qr: string })
        : Promise<{ success: boolean, message: string, data?: IQr, attendance?: IAttendance, points?: IPoints }> {
        const data = await this.QrModel.findById(qr)
        const isqr = await bcrypt.compare(qr, data._id.toString())

        const attendance = await this.AttendanceModel.findOne({ qr })
        const points = await this.PointModel.findOne({ qr })

        if (!isqr) return { success: false, message: 'Cannot find qr user!' }
        return { success: true, message: 'Qr user data retrieved successfully!', data, attendance, points }
    }

    async InsertQr({ idNumber, name, degree }: IQr)
        : Promise<{ success: boolean, message: string, qr: string }> {
        const salt = await bcrypt.genSalt()
        const hashedqr = await bcrypt.hash(idNumber, salt)

        const data = await this.QrModel.create({ idNumber: hashedqr, name, degree })
        return { success: true, message: 'Qr created successfully!', qr: data._id.toString() }
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
