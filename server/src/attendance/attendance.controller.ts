import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { PointsService } from 'src/points/points.service';

@Controller('attendance')
export class AttendanceController {
    constructor(
        private readonly attendanceService: AttendanceService,
        private readonly pointService: PointsService
    ) { }

    @Post('create-attended')
    async CreateAttended(@Body() { qr }: { qr: string }) {
        try {
            await this.pointService.InsertPoint({ qr })
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

    @Post('reset')
    async DeleteAttendance() {
        try {
            return await this.attendanceService.ResetAttendance()
        } catch (error) {
            throw new HttpException({ success: false, message: 'Failed to execute reset attendance', error }, HttpStatus.BAD_REQUEST)
        }
    }
}
