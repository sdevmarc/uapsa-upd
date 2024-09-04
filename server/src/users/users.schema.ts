import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
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
        enum: ['exeboard', 'membership', 'academic', 'external', 'publicity', 'finance', 'logistic', 'internal'],
        required: true
    }
}, { timestamps: true })