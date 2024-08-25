import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post('create-user')
    async CreateUser(@Body() { email, password }: { email: string, password: string }) {
        try {
            return await this.userService.InsertUser({ email, password })
        } catch (error) {
            throw new HttpException({ success: false, message: 'User not created successfully!' }, HttpStatus.BAD_REQUEST)
        }
    }

    @Post('login-user')
    async LoginUser(@Body() { email, password }: { email: string, password: string }) {
        try {
            return this.userService.ReadLoginUser({ email, password })
        } catch (error) {
            throw new HttpException({ success: false, message: 'User failed to login!' }, HttpStatus.BAD_REQUEST)
        }
    }
}
