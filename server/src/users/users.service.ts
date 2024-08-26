import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUsers } from './users.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User')
        private readonly UserModel: Model<IUsers>,
        private readonly jwtService: JwtService
    ) { }

    async findAll()
        : Promise<{ success: boolean, message: string, data: IUsers[] }> {
        const data = await this.UserModel.find()
        if (data.length <= 0) return { success: true, message: 'No existing users!', data }
        return { success: true, message: 'Users retrieved successfully!', data }
    }

    async findOne({ email })
        : Promise<{ success: boolean, message: string, data: IUsers }> {
        const data = await this.UserModel.findOne({ email })
        if (!data) return { success: true, message: 'Cannot find user!', data }
        return { success: true, message: 'User retrieved successfully!', data }
    }

    async InsertUser({ qr, email, password }: { qr: string, email: string, password: string })
        : Promise<{ success: boolean, message: string, qr: string }> {
        const salt = await bcrypt.genSalt()
        const hashedpassword = await bcrypt.hash(password, salt)

        const data = await this.UserModel.create({ qr, email, password: hashedpassword })
        return { success: true, message: 'Qr created successfully', qr: data.qr }
    }

    async ReadLoginUser({ email, password }: { email: string, password: string })
        : Promise<{ success: boolean, message: string, access_token: string }> {
        const isemail = await this.UserModel.findOne({ email })
        if (!isemail) throw new UnauthorizedException('Email does not recognized.')

        const ispassword = await bcrypt.compare(password, isemail.password)
        if (!ispassword) throw new UnauthorizedException('Password is incorrect.')

        const payload = { sub: isemail._id }
        const jwt = await this.jwtService.signAsync(payload)
        return { success: true, message: 'Logged in successfully!', access_token: jwt }
    }

    async DeleteUser({ email }: { email: string })
        : Promise<{ success: boolean, message: string }> {
        await this.UserModel.deleteOne({ email })
        return { success: true, message: 'Qr resetted successfully!' }
    }
}
