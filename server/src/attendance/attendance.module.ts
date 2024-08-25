import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceSchema } from './attendance.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Attendance', schema: AttendanceSchema }])],
    providers: [AttendanceService],
    controllers: [AttendanceController]
})
export class AttendanceModule { }
