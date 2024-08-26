import { Module } from '@nestjs/common';
import { QrService } from './qr.service';
import { QrController } from './qr.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QRSchema } from './qr.schema';
import { AttendanceSchema } from 'src/attendance/attendance.schema';
import { PointsSchema } from 'src/points/points.schema';
import { AttendanceService } from 'src/attendance/attendance.service';
import { PointsService } from 'src/points/points.service';

@Module({
    imports: [MongooseModule.forFeature([
        { name: 'Qr', schema: QRSchema },
        { name: 'Attendance', schema: AttendanceSchema },
        { name: 'Point', schema: PointsSchema }
    ])],
    providers: [QrService],
    controllers: [QrController]
})
export class QrModule { }
