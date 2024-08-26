import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { QrService } from './qr.service';
import { IQr } from './qr.interface';

@Controller('qr')
export class QrController {
    constructor(
        private readonly qrService: QrService
    ) { }

    @Post('create-qr')
    async CreateQr(@Body() { idNumber, name, degree }: IQr) {
        try {
            return await this.qrService.InsertQr({ idNumber, name, degree })
        } catch (error) {
            throw new HttpException({ success: false, message: 'Qr failed to create.' }, HttpStatus.BAD_REQUEST)
        }
    }
}
