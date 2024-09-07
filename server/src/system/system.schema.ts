import mongoose from "mongoose";

export const SystemUISchema = new mongoose.Schema({
    public_id: {
        type: String,
        required: true
    },
    loginBgImage: String,
    header: {
        headerTitle: String,
        headerIcon: String
    }
}, { timestamps: true })