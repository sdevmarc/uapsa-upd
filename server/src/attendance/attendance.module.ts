import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceSchema } from './attendance.schema';
import { PointsSchema } from 'src/points/points.schema';
import { PointsService } from 'src/points/points.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Attendance', schema: AttendanceSchema },
            { name: 'Point', schema: PointsSchema },
        ]),
    ],
    providers: [AttendanceService, PointsService],
    controllers: [AttendanceController]
})
export class AttendanceModule { }
