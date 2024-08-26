import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { PointsService } from './points.service';

@Controller('points')
export class PointsController {
    constructor(
        private readonly pointService: PointsService
    ) { }

    @Post('add-point')
    async CreatePoint(@Body() { qr }: { qr: string }) {
        try {
            return await this.pointService.InsertPoint({ qr })
        } catch (error) {
            throw new HttpException({ success: false, message: 'Point failed to add to the user.' }, HttpStatus.BAD_REQUEST)
        }
    }

    @Post('less-point')
    async MinusPoint(@Body() { qr }: { qr: string }) {
        try {
            return await this.pointService.LessPoint({ qr })
        } catch (error) {
            throw new HttpException({ success: false, message: 'Point failed to less point to the user.' }, HttpStatus.BAD_REQUEST)
        }
    }

    @Post('reset')
    async ResetPoints() {
        try {
            return await this.pointService.ResetPoints()
        } catch (error) {
            throw new HttpException({ success: false, message: 'Point failed to reset points.' }, HttpStatus.BAD_REQUEST)
        }
    }
}
