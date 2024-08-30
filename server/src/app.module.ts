import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceModule } from './attendance/attendance.module';
import { QrModule } from './qr/qr.module';
import { PointsModule } from './points/points.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('SECRET_JWT_TOKEN'),
                signOptions: { expiresIn: '1d' },
            }),
            inject: [ConfigService],
        }),
        UsersModule,
        MongooseModule.forRoot('mongodb://localhost:27017/upoints-kiosk'),
        AttendanceModule,
        QrModule,
        PointsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
