import mongoose from "mongoose";

export const QRSchema = new mongoose.Schema({
    idNumber: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    }
}, { timestamps: true })