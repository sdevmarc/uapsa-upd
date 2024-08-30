import { Controller, Get, HttpException, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard, SessionGuard } from './auth/auth.guard';
import { Request } from 'express';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @UseGuards(SessionGuard)
    @Get()
    async getHello(@Req() req: Request) {
        try {
            const role = (req as any).role
            if (!role) return { success: false, message: 'You are not authorized.' }

            const response = await this.appService.getHello();
            if (!response.success) return { success: true, message: 'You are not authorized.' }

            return { success: true, message: 'You are authorized.', role }
        } catch (error) {
            throw new HttpException({ success: false, message: 'You are not authorized.' }, HttpStatus.BAD_REQUEST)
        }
    }
}
