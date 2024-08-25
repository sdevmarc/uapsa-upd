import mongoose from "mongoose";

export const PointsSchema = new mongoose.Schema({
    qr: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Qr',
        required: true
    },
    points: {
        required: true,
        type: Number,
        default: 0
    }
}, { timestamps: true })