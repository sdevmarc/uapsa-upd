import { Document } from "mongoose";

export interface IUsers extends Document {
    qr: string
    email: string
    password: string
    isactive: boolean
    role: string
}
