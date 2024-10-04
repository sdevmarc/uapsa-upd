import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { PointsService } from './points.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('points')
export class PointsController {
    constructor(
        private readonly pointService: PointsService
    ) { }

    @Post('add-point')
    async CreatePoint(@Body() { idNumbers, points }: { idNumbers: string[], points: number }) {
        return await this.pointService.insertPoint({ idNumbers, points })
    }

    @UseGuards(AuthGuard)
    @Post('less-point')
    async MinusPoint(@Body() { qr }: { qr: string }) {
        return await this.pointService.LessPoint({ qr })
    }

    @UseGuards(AuthGuard)
    @Post('reset')
    async ResetPoints() {
        return await this.pointService.ResetPoints()
    }
}
