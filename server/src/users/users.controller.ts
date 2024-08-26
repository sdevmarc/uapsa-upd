import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post('create-user')
    async CreateUser(@Body() { qr, email, password }: { qr: string, email: string, password: string }) {
        try {
            return await this.userService.InsertUser({ qr, email, password })
        } catch (error) {
            throw new HttpException({ success: false, message: 'User not created successfully!', error }, HttpStatus.BAD_REQUEST)
        }
    }

    @Post('login-user')
    async LoginUser(@Body() { email, password }: { email: string, password: string }) {
        try {
            return this.userService.ReadLoginUser({ email, password })
        } catch (error) {
            throw new HttpException({ success: false, message: 'User failed to login!', error }, HttpStatus.BAD_REQUEST)
        }
    }


    @Post('delete-user')
    async RemoveUser(@Body() { email }: { email: string }) {
        try {
            return this.userService.DeleteUser({ email })
        } catch (error) {
            throw new HttpException({ success: false, message: 'User failed to login!', error }, HttpStatus.BAD_REQUEST)
        }
    }
}
