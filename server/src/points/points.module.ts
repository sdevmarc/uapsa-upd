import { Module } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointsController } from './points.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PointsSchema } from './points.schema';
import { QRSchema } from 'src/qr/qr.schema';

@Module({
    imports: [MongooseModule.forFeature([
        { name: 'Point', schema: PointsSchema },
        { name: 'Qr', schema: QRSchema },
    ])],
    providers: [PointsService],
    controllers: [PointsController]
})
export class PointsModule { }
