import mongoose from "mongoose";

export const PointsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    points: {
        required: true,
        type: String
    }
}, { timestamps: true })