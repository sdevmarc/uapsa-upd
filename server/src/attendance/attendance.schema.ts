import mongoose from "mongoose";

export const AttendanceSchema = new mongoose.Schema({
    date: {
        required: true,
        type: Date,
        default: Date.now()
    },
}, { timestamps: true })