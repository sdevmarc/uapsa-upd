import mongoose from "mongoose";

export const AttendanceSchema = new mongoose.Schema({
    qr: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Qr',
        required: true
    },
    date: {
        required: true,
        type: Date,
        default: Date.now()
    },
}, { timestamps: true })