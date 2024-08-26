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
