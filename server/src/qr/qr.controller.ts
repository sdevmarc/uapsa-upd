import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { QrService } from './qr.service';
import { IQr } from './qr.interface';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('qr')
export class QrController {
    constructor(
        private readonly qrService: QrService
    ) { }

    @UseGuards(AuthGuard)
    @Get()
    async ViewAllQrUsers() {
        try {
            return await this.qrService.findAll()
        } catch (error) {
            throw new HttpException({ success: false, message: 'Qr data failed to retrieved!' }, HttpStatus.BAD_REQUEST)
        }
    }

    @Get(':qr')
    async ViewOneQrUser(@Param('qr') qr: string) {
        return await this.qrService.findOne({ qr })
    }

    @Get('find/:qr')
    async findQrUser(@Param('qr') qr: string) {
        return await this.qrService.findQrUser(qr)
    }

    @Post('create-qr')
    async CreateQr(@Body() { idNumber, name }: IQr) {
        try {
            return await this.qrService.InsertQr({ idNumber, name })
        } catch (error) {
            throw new HttpException({ success: false, message: 'Qr failed to create.' }, HttpStatus.BAD_REQUEST)
        }
    }

    @UseGuards(AuthGuard)
    @Post('less/points')
    async LessQrPoints(@Body() { idNumber, points }: {idNumber: string[], points: number }) {
        try {
            return await this.qrService.lessPointQr({ idNumber, points })
        } catch (error) {
            throw new HttpException({ success: false, message: 'Qr failed to create.' }, HttpStatus.BAD_REQUEST)
        }
    }

    @UseGuards(AuthGuard)
    @Post('less/attendance')
    async LessQrAttendance(@Body() { idNumber, attended }: {idNumber: string[], attended: number }) {
        try {
            return await this.qrService.lessAttendanceQr({ idNumber, attended })
        } catch (error) {
            throw new HttpException({ success: false, message: 'Qr failed to create.' }, HttpStatus.BAD_REQUEST)
        }
    }

    @UseGuards(AuthGuard)
    @Post('delete-qr')
    async RemoveQrUser(@Body() { qr }: { qr: string }) {
        try {
            return await this.qrService.DeleteQr({ qr })
        } catch (error) {
            throw new HttpException({ success: false, message: 'Qr failed to create.' }, HttpStatus.BAD_REQUEST)
        }
    }

    @UseGuards(AuthGuard)
    @Post('reset-progress')
    async ResetProgress(@Body() { idNumber }: { idNumber: string[] }) {
        try {
            return await this.qrService.resetAllProgress({ idNumber })
        } catch (error) {
            throw new HttpException({ success: false, message: 'Qr failed to create.' }, HttpStatus.BAD_REQUEST)
        }
    }

    @UseGuards(AuthGuard)
    @Post('delete-multiple-qr')
    async DeleteMultipleQr(@Body() { idNumber }: { idNumber: string[] }) {
        try {
            return await this.qrService.deleteMultipleQr({ idNumber })
        } catch (error) {
            throw new HttpException({ success: false, message: 'Qr failed to create.' }, HttpStatus.BAD_REQUEST)
        }
    }

    @UseGuards(AuthGuard)
    @Post('reset-all-progress')
    async ResetAllProgressQr(@Body() { idNumber }: { idNumber: string[] }) {
        try {
            return await this.qrService.resetAllProgress({ idNumber })
        } catch (error) {
            throw new HttpException({ success: false, message: 'Qr failed to clear data.' }, HttpStatus.BAD_REQUEST)
        }
    }
}
