import mongoose from "mongoose";

export const SystemUISchema = new mongoose.Schema({
    index: {
        type: Number,
        required: true,
        default: 1
    },
    header: {
        public_id: {
            type: String,
            default: ''
        },
        headerTitle: {
            type: String,
            default: ''
        },
        headerIconUrl: {
            type: String,
            default: ''
        }
    },
    signin: {
        public_id: {
            type: String,
            default: ''
        },
        bgImageUrl: {
            type: String,
            default: ''
        },
    }
}, { timestamps: true })