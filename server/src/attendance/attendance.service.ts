import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAttendance } from './attendance.interface';
import { IPoints } from 'src/points/points.interface';

@Injectable()
export class AttendanceService {
    constructor(
        @InjectModel('Attendance') private readonly AttendanceModel: Model<IAttendance>
    ) { }

    async findAll()
        : Promise<{ success: boolean, message: string, data: IAttendance[] }> {
        const data = await this.AttendanceModel.find()
        if (data.length <= 0) return { success: true, message: 'No existing attendance.', data }
        return { success: true, message: 'Attendance retrieved successfully', data }
    }

    async findOne({ qr }: { qr: string })
        : Promise<{ success: boolean, message: string, data: IAttendance }> {

        const data = await this.AttendanceModel.findOne({ qr })
        if (!data) return { success: true, message: 'Cannot find attendance!', data }

        return { success: true, message: 'User attendance retrieved successfully!', data }
    }

    async InsertAttended({ qr }: IAttendance)
        : Promise<{ success: boolean, message: string }> {
        await this.AttendanceModel.findOneAndUpdate(
            { qr },
            { $inc: { attended: 1 } },
            { new: true, upsert: true }
        )

        return { success: true, message: 'Attended created sucessfully!' }
    }

    async InsertAbsent({ qr }: IAttendance)
        : Promise<{ success: boolean, message: string }> {
        await this.AttendanceModel.findOneAndUpdate(
            { qr },
            { $inc: { absences: 1 } },
            { new: true, upsert: true }
        )

        return { success: true, message: 'Absent created sucessfully!' }
    }

    async ResetAttendance()
        : Promise<{ success: boolean, message: string }> {
        await this.AttendanceModel.deleteMany({})

        return { success: true, message: 'Attendance resetted sucessfully!' }
    }
}
