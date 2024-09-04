import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { IPromiseQr, IQr } from './qr.interface';
import { IAttendance } from 'src/attendance/attendance.interface';
import { IPoints } from 'src/points/points.interface';

@Injectable()
export class QrService {
    constructor(
        @InjectModel('Qr') private readonly QrModel: Model<IQr>,
        @InjectModel('Attendance') private readonly AttendanceModel: Model<IAttendance>,
        @InjectModel('Point') private readonly PointModel: Model<IPoints>
    ) { }

    async findAll()
        : Promise<IPromiseQr> {
        const data = await this.QrModel.aggregate([
            {
                $lookup: {
                    from: 'points', // The name of the Points collection
                    localField: '_id',
                    foreignField: 'qr',
                    as: 'pointsData'
                }
            },
            {
                $unwind: {
                    path: '$pointsData',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'attendances',
                    localField: '_id',
                    foreignField: 'qr',
                    as: 'attendanceData'
                }
            },
            {
                $unwind: {
                    path: '$attendanceData',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    idNumber: 1,
                    name: 1,
                    degree: 1,
                    points: { $ifNull: ['$pointsData.points', 0] },
                    attended: { $ifNull: ['$attendanceData.attended', 0] }
                }
            }
        ])
        return { success: true, message: 'Qr users retrieved successfully!', data }
    }

    async findOne({ qr }: { qr: string })
        : Promise<IPromiseQr> {
        const data = await this.QrModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(qr)
                }
            },
            {
                $lookup: {
                    from: 'points',
                    localField: '_id',
                    foreignField: 'qr',
                    as: 'pointsData'
                }
            },
            {
                $unwind: {
                    path: '$pointsData',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'attendances',
                    localField: '_id',
                    foreignField: 'qr',
                    as: 'attendanceData'
                }
            },
            {
                $unwind: {
                    path: '$attendanceData',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    idNumber: 1,
                    name: 1,
                    degree: 1,
                    points: { $ifNull: ['$pointsData.points', 0] },
                    attended: { $ifNull: ['$attendanceData.attended', 0] }
                }
            }
        ]);

        return { success: true, message: 'Data retrieved successfully!', data: data[0] };
    }

    async InsertQr({ idNumber, name }: IQr)
        : Promise<IPromiseQr> {
        const qruser = await this.QrModel.findOne({ idNumber })
        if (qruser) return { success: false, message: 'Id number already exist!' }

        const data = await this.QrModel.create({ idNumber, name })
        return { success: true, message: 'Qr created successfully!', qr: data._id.toString() }
    }

    async DeleteQr({ qr }: IQr)
        : Promise<IPromiseQr> {
        await this.QrModel.findByIdAndDelete(qr)
        return { success: true, message: 'Qr deleted successfully!' }
    }

    async ResetQr()
        : Promise<IPromiseQr> {
        await this.QrModel.deleteMany({})
        return { success: true, message: 'Qr resetted successfully!' }
    }
}
