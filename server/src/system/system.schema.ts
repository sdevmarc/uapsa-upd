import mongoose from "mongoose";

export const SystemUISchema = new mongoose.Schema({
    index: {
        type: Number,
        required: true,
        default: 1
    },
    header_title: {
        type: String,
        required: true,
        default: 'UAPSA-UPD'
    },
    header_icon: {
        header_icon_public_id: {
            type: String,
            default: ''
        },
        header_icon_url: {
            type: String,
            default: ''
        }
    },
    sign_in: {
        bg_image_public_id: {
            type: String,
            default: ''
        },
        bg_image_url: {
            type: String,
            default: ''
        },
    }
}, { timestamps: true })