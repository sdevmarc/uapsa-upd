import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { QrService } from 'src/qr/qr.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private readonly qrservice: QrService
    ) { }

    @UseGuards(AuthGuard)
    @Get()
    async ViewAllUsers() {
        try {
            return await this.userService.findAll()
        } catch (error) {
            throw new HttpException({ success: false, message: 'Failed to retrieved all users.' }, HttpStatus.BAD_REQUEST)
        }
    }

    @Get('users-exist')
    async ViewUsersExistence() {
        try {
            return await this.userService.findUsersExist()
        } catch (error) {
            throw new HttpException({ success: false, message: 'Failed to retrieved user existence.' }, HttpStatus.BAD_REQUEST)
        }
    }

    @UseGuards(AuthGuard)
    @Get(':email')
    async ViewOneIUser(
        @Param() { email }: { email: string }
    ) {
        try {
            return await this.userService.findOne({ email })
        } catch (error) {
            throw new HttpException({ success: false, message: 'User data failed to retrieved!' }, HttpStatus.BAD_REQUEST)
        }
    }


    @Post('create-user')
    async CreateUser(@Body() { qr, email, password }: { qr: string, email: string, password: string }) {
        try {
            return await this.userService.InsertUser({ qr, email, password })
        } catch (error) {
            throw new HttpException({ success: false, message: 'User not created successfully!', error }, HttpStatus.BAD_REQUEST)
        }
    }

    @Post('create-first-time-user')
    async CreateFirstTimeUser(@Body() { idNumber, name, degree, email, password }: { idNumber: string, name: string, degree: string, email: string, password: string }) {
        try {
            const data = await this.qrservice.InsertQr({ idNumber, name, degree })
            return await this.userService.InsertUser({ qr: data.qr, email, password, role: 'admin' })
        } catch (error) {
            throw new HttpException({ success: false, message: 'User not created successfully!', error }, HttpStatus.BAD_REQUEST)
        }
    }

    @Post('login-user')
    async LoginUser(
        @Body() { email, password }: { email: string, password: string }
    ) {
        try {
            return await this.userService.ReadLoginUser({ email, password })
        } catch (error) {
            throw new HttpException({ success: false, message: 'User failed to login!', error }, HttpStatus.BAD_REQUEST)
        }
    }

    @UseGuards(AuthGuard)
    @Post('update-user')
    async UpdateUser(@Body() { id, role }: { id: string, role: string }) {
        try {
            return await this.userService.UpdateUser({ id, role })
        } catch (error) {
            throw new HttpException({ success: false, message: 'User failed to update.' }, HttpStatus.BAD_REQUEST)
        }
    }

    @UseGuards(AuthGuard)
    @Post('delete-user')
    async RemoveUser(@Body() { email }: { email: string }) {
        try {
            return this.userService.DeleteUser({ email })
        } catch (error) {
            throw new HttpException({ success: false, message: 'User failed to login!', error }, HttpStatus.BAD_REQUEST)
        }
    }
}
