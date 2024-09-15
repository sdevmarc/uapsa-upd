import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPromiseUsers, IUsers } from './users.interface';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { IQr } from 'src/qr/qr.interface';
import { IPoints } from 'src/points/points.interface';
import { IAttendance } from 'src/attendance/attendance.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly UserModel: Model<IUsers>,
        @InjectModel('Attendance') private readonly AttendanceModel: Model<IAttendance>,
        @InjectModel('Qr') private readonly QrModel: Model<IQr>,
        @InjectModel('Point') private readonly PointModel: Model<IPoints>,
        private readonly jwtService: JwtService
    ) { }

    async findUsersExist()
        : Promise<IPromiseUsers> {
        const response = await this.UserModel.find()
        if (response.length > 0) return { success: true, message: 'Users already exist!' }
        return { success: false, message: 'No users found.' }
    }

    // async findRole({ email }: IUsers)
    //     : Promise<IPromiseUsers> {
    //     try {
    //         const response = await this.UserModel.findOne({ email })
    //         if (!response) return { success: false, message: 'No user found.' }

    //         return { success: true, message: 'User role found.', data: response.role }
    //     } catch (error) {
    //         throw new HttpException({ success: false, message: 'Failed to find role.' }, HttpStatus.BAD_REQUEST)
    //     }
    // }

    // async findAll()
    //     : Promise<IPromiseUsers> {
    //     const data = await this.UserModel.aggregate([
    //         {
    //             $lookup: {
    //                 from: 'qrs',
    //                 localField: 'qr',
    //                 foreignField: '_id',
    //                 as: 'qrData'
    //             }
    //         },
    //         {
    //             $unwind: {
    //                 path: '$qrData',
    //                 preserveNullAndEmptyArrays: true
    //             }
    //         },
    //         {
    //             $project: {
    //                 email: 1,
    //                 role: 1,
    //                 idNumber: '$qrData.idNumber',
    //                 name: '$qrData.name',
    //                 degree: '$qrData.degree',
    //             }
    //         }
    //     ]);

    //     if (data.length <= 0) return { success: false, message: 'No existing users!', data }
    //     return { success: true, message: 'Users retrieved successfully!', data }
    // }

    async findAll()
        : Promise<IPromiseUsers> {
        const data = await this.UserModel.find()
        return { success: true, message: 'Users retrieved successfully!', data }
    }

    async findOne({ email }: IUsers)
        : Promise<IPromiseUsers> {
        const data = await this.UserModel.findOne({ email })
        return { success: true, message: 'User retrieved successfully!', data }
    }

    async InsertUser({ name, email, password, role }: IUsers)
        : Promise<IPromiseUsers> {
        const salt = await bcrypt.genSalt()
        const hashedpassword = await bcrypt.hash(password, salt)
        const loweremail = email.toLowerCase()

        const isemail = await this.UserModel.findOne({ email: loweremail })
        if (isemail) return { success: false, message: 'Email already exist!' }

        await this.UserModel.create({ name, email: loweremail, password: hashedpassword, role })
        return { success: true, message: 'User created successfully' }
    }

    async ReadLoginUser({ email, password }: IUsers)
        : Promise<IPromiseUsers> {
        const isemail = await this.UserModel.findOne({ email })
        if (!isemail) return ({ success: false, message: 'Email do not exist.' })

        const ispassword = await bcrypt.compare(password, isemail.password)
        if (!ispassword) return ({ success: false, message: 'Password is incorrect.' })

        const payload = { sub: isemail._id, role: isemail.role }
        const jwt = await this.jwtService.signAsync(payload)
        return { success: true, message: 'Logged in successfully!', access_token: jwt }
    }

    async UpdateUser({ id, role }: IUsers)
        : Promise<IPromiseUsers> {
        await this.UserModel.findByIdAndUpdate(id, { role }, { new: true })
        return { success: true, message: 'User updated successfully!' }
    }

    async DeleteUser({ id }: IUsers)
        : Promise<IPromiseUsers> {
        const userdata = await this.UserModel.findById(id)
        if (!userdata) return { success: false, message: 'User not found.' }

        await this.UserModel.findByIdAndDelete(id)
        return { success: true, message: 'User deleted successfully!' }
    }
}
