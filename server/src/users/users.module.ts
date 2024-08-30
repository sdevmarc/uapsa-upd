import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.schema';
import { UsersController } from './users.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QRSchema } from 'src/qr/qr.schema';
import { QrService } from 'src/qr/qr.service';
import { AttendanceService } from 'src/attendance/attendance.service';
import { AttendanceSchema } from 'src/attendance/attendance.schema';
import { PointsService } from 'src/points/points.service';
import { PointsSchema } from 'src/points/points.schema';
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema },
            { name: 'Qr', schema: QRSchema },
            { name: 'Attendance', schema: AttendanceSchema },
            { name: 'Point', schema: PointsSchema },
        ]),
    ],
    providers: [
        UsersService,
        QrService,
        AttendanceService,
        PointsService
    ],
    controllers: [UsersController]
})
export class UsersModule { }
