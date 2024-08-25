import mongoose from "mongoose";

export const QRSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    qr: {
        required: true,
        type: String
    }
}, { timestamps: true })