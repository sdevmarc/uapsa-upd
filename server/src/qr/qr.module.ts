import { Module } from '@nestjs/common';
import { QrService } from './qr.service';
import { QrController } from './qr.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QRSchema } from './qr.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Qr', schema: QRSchema }])],
    providers: [QrService],
    controllers: [QrController]
})
export class QrModule { }
