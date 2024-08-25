import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    qr: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Qr',
        required: true
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    isactive: {
        required: true,
        type: Boolean,
        default: 0
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, { timestamps: true })