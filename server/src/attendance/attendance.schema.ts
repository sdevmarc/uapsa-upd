import mongoose from "mongoose";

export const AttendanceSchema = new mongoose.Schema({
    qr: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Qr',
        required: true
    },
    attended: {
        type: Number,
        required: true,
        default: 0
    },
    // absences: {
    //     type: Number,
    //     required: true,
    //     default: 0
    // }
}, { timestamps: true })