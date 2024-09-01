import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUsers } from './users.interface';
import * as bcrypt from 'bcryptjs'
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
        : Promise<{ success: boolean, message: string }> {
        const response = await this.UserModel.find()
        if (response.length > 0) return { success: true, message: 'Users already exist!' }
        return { success: false, message: 'No users found.' }
    }

    async findAll()
        : Promise<{ success: boolean, message: string, data: IUsers[] }> {
        const data = await this.UserModel.aggregate([
            {
                $lookup: {
                    from: 'qrs',
                    localField: 'qr',
                    foreignField: '_id',
                    as: 'qrData'
                }
            },
            {
                $unwind: {
                    path: '$qrData',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    email: 1,
                    role: 1,
                    idNumber: '$qrData.idNumber',
                    name: '$qrData.name',
                    degree: '$qrData.degree',
                }
            }
        ]);

        if (data.length <= 0) return { success: false, message: 'No existing users!', data }
        return { success: true, message: 'Users retrieved successfully!', data }
    }

    async findOne({ email })
        : Promise<{ success: boolean, message: string, data: IUsers }> {
        const data = await this.UserModel.findOne({ email })
        if (!data) return { success: true, message: 'Cannot find user!', data }
        return { success: true, message: 'User retrieved successfully!', data }
    }

    async InsertUser({ qr, email, password, role }: { qr: string, email: string, password: string, role?: string })
        : Promise<{ success: boolean, message: string, qr?: string }> {
        const salt = await bcrypt.genSalt()
        const hashedpassword = await bcrypt.hash(password, salt)

        const isemail = await this.UserModel.findOne({ email })
        if (isemail) return { success: false, message: 'Email already exist!' }

        const data = await this.UserModel.create({ qr, email, password: hashedpassword, role })
        return { success: true, message: 'User created successfully', qr: data.qr }
    }

    async ReadLoginUser({ email, password }: { email: string, password: string })
        : Promise<{ success: boolean, message: string, access_token: string }> {
        const isemail = await this.UserModel.findOne({ email })
        const existinguser = await this.UserModel.find()

        if (existinguser.length <= 0) return ({ success: false, message: 'No existing account.', access_token: null })
        if (!isemail) throw new UnauthorizedException('Email does not recognized.')

        const ispassword = await bcrypt.compare(password, isemail.password)
        if (!ispassword) throw new UnauthorizedException('Password is incorrect.')

        const payload = { sub: isemail._id, role: isemail.role }
        const jwt = await this.jwtService.signAsync(payload)
        return { success: true, message: 'Logged in successfully!', access_token: jwt }
    }

    async UpdateUser({ id, role }: { id: string, role: string })
        : Promise<{ success: boolean, message: string }> {
        await this.UserModel.findByIdAndUpdate(id, { role }, { new: true })
        return { success: true, message: 'User updated successfully!' }
    }

    async DeleteUser({ id }: { id: string })
        : Promise<{ success: boolean, message: string }> {
        const userdata = await this.UserModel.findById(id)
        if (!userdata) return { success: false, message: 'User not found.' }

        await this.QrModel.findByIdAndDelete(userdata.qr)
        await this.UserModel.findByIdAndDelete(id)
        return { success: true, message: 'User deleted successfully!' }
    }
}
