import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUsers } from './users.interface';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly UserModel: Model<IUsers>) { }

    async InsertUser({ email, password }: { email: string, password: string }) {
        await this.UserModel.create({ email, password })
    }

}
