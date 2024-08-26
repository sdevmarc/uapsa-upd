import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { QrService } from './qr.service';
import { IQr } from './qr.interface';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('qr')
export class QrController {
    constructor(
        private readonly qrService: QrService
    ) { }

    @UseGuards(AuthGuard)
    @Post('create-qr')
    async CreateQr(@Body() { idNumber, name, degree }: IQr) {
        try {
            return await this.qrService.InsertQr({ idNumber, name, degree })
        } catch (error) {
            throw new HttpException({ success: false, message: 'Qr failed to create.' }, HttpStatus.BAD_REQUEST)
        }
    }

    @UseGuards(AuthGuard)
    @Post('delete-qr')
    async RemoveQrUser(@Body() { idNumber }: { idNumber: string }) {
        try {
            return await this.qrService.DeleteQr({ idNumber })
        } catch (error) {
            throw new HttpException({ success: false, message: 'Qr failed to create.' }, HttpStatus.BAD_REQUEST)
        }
    }

    @UseGuards(AuthGuard)
    @Post('reset')
    async DeleteQr() {
        try {
            return await this.qrService.ResetQr()
        } catch (error) {
            throw new HttpException({ success: false, message: 'Qr failed to clear data.' }, HttpStatus.BAD_REQUEST)
        }
    }
}
