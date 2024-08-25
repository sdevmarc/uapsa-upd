import { Document } from "mongoose";

export interface IUsers extends Document {
    email: string
    password: string
    isactive: boolean
    role: string
}
