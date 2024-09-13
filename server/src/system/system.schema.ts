import mongoose from "mongoose";

export const SystemHeaderUISchema = new mongoose.Schema({
    public_id: String,
    headerTitle: String,
    headerIconUrl: String
}, { timestamps: true })

export const SystemSignInUISchema = new mongoose.Schema({
    public_id: String,
    bgImageUrl: String
}, { timestamps: true })