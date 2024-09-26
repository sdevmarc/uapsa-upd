import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAttendance } from './attendance.interface';
import { IPoints } from 'src/points/points.interface';
import { IQr } from 'src/qr/qr.interface';

@Injectable()
export class AttendanceService {
    constructor(
        @InjectModel('Attendance') private readonly AttendanceModel: Model<IAttendance>,
        @InjectModel('Qr') private readonly QrModel: Model<IQr>
    ) { }

    async findAll()
        : Promise<{ success: boolean, message: string, data: IAttendance[] }> {
        try {
            const data = await this.AttendanceModel.find()
            return { success: true, message: 'Attendance retrieved successfully', data }
        } catch (error) {
            throw new HttpException({ success: false, message: 'Qr user data failed to retrieved users.', error }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findOne({ qr }: { qr: string })
        : Promise<{ success: boolean, message: string, data: IAttendance }> {
        try {
            const data = await this.AttendanceModel.findOne({ qr })
            if (!data) return { success: false, message: 'Cannot find attendance!', data }

            return { success: true, message: 'User attendance retrieved successfully!', data }
        } catch (error) {
            throw new HttpException({ success: false, message: 'Qr user data failed to retrieved a user.', error }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async InsertAttended({ qr }: IAttendance)
        : Promise<{ success: boolean, message: string, qr?: string }> {
        try {
            const decoded_base64 = this.decodeBase64(qr)

            const isqr = await this.QrModel.findById(decoded_base64)
            if (!isqr) return { success: false, message: 'Qr is not registered.' }
            await this.AttendanceModel.findOneAndUpdate(
                { qr: decoded_base64 },
                { $inc: { attended: 1 } },
                { new: true, upsert: true }
            )

            return { success: true, message: 'Attended created sucessfully!', qr: isqr._id.toString() }
        } catch (error) {
            throw new HttpException({ success: false, message: 'Qr user data failed to insert attendance.', error }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async InsertAbsent({ qr }: IAttendance)
        : Promise<{ success: boolean, message: string }> {
        try {
            await this.AttendanceModel.findOneAndUpdate(
                { qr },
                { $inc: { absences: 1 } },
                { new: true, upsert: true }
            )

            return { success: true, message: 'Absent created sucessfully!' }
        } catch (error) {
            throw new HttpException({ success: false, message: 'Qr user data failed to insert absent.', error }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async ResetAttendance()
        : Promise<{ success: boolean, message: string }> {
        try {
            await this.AttendanceModel.deleteMany({})

            return { success: true, message: 'Attendance resetted sucessfully!' }
        } catch (error) {
            throw new HttpException({ success: false, message: 'Qr user data failed to reset attendance.', error }, HttpStatus.INTERNAL_SERVER_ERROR)
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
