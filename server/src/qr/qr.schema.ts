import mongoose from "mongoose";

export const QRSchema = new mongoose.Schema({
    idNumber: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    qr: {
        required: true,
        type: String
    }
}, { timestamps: true })