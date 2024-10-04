import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { PointsService } from 'src/points/points.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('attendance')
export class AttendanceController {
    constructor(
        private readonly attendanceService: AttendanceService,
        private readonly pointService: PointsService
    ) { }

    // @Get()
    // async ViewAllAttendance() {
    //     try {
    //         return await this.attendanceService.findAll()
    //     } catch (error) {
    //         throw new HttpException({ success: false, message: 'Failed to retrieved attendance.' }, HttpStatus.BAD_REQUEST)
    //     }
    // }

    // @Get(':qr')
    // async ViewOneAttendance(
    //     @Param() { qr }: { qr: string }
    // ) {
    //     try {
    //         return await this.attendanceService.findOne({ qr })
    //     } catch (error) {
    //         throw new HttpException({ success: false, message: 'Failed to retrieved user attendance.' }, HttpStatus.BAD_REQUEST)
    //     }
    // }

    @Post('create-attended')
    async CreateAttended(@Body() { qr }: { qr: string }) {
        try {
            await this.pointService.InsertPointFromAttendance({ qr })
            return await this.attendanceService.InsertAttended({ qr })
        } catch (error) {
            throw new HttpException({ success: false, message: 'Creating attended failed to create.', error }, HttpStatus.BAD_REQUEST)
        }
    }

    @Post('create-absent')
    async CreateAbsent(@Body() { qr }: { qr: string }) {
        try {
            return await this.attendanceService.InsertAbsent({ qr })
        } catch (error) {
            throw new HttpException({ success: false, message: 'Creating absent failed to create.', error }, HttpStatus.BAD_REQUEST)
        }
    }

    @UseGuards(AuthGuard)
    @Post('reset')
    async DeleteAttendance() {
        try {
            return await this.attendanceService.ResetAttendance()
        } catch (error) {
            throw new HttpException({ success: false, message: 'Failed to execute reset attendance', error }, HttpStatus.BAD_REQUEST)
        }
    }
}
