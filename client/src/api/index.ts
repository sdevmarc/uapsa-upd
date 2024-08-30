import { HOST } from '@/constants'
import axios from 'axios'

interface IUser {
    email: string
    password: string
}

export const API_SIGN_IN = async ({ email, password }: IUser) => {
    try {
        const response = await axios.post(`${HOST}/users/login-user`, { email, password })
        return response.data
    } catch (error) {
        throw error
    }
}

export const API_SIGN_UP = async ({ idNumber, name, degree, email, password }: { idNumber: string, name: string, degree: string, email: string, password: string }) => {
    try {
        const response = await axios.post(`${HOST}/users/create-first-time-user`,
            { idNumber, name, degree, email, password }
        )
        return response.data
    } catch (error) {
        throw error
    }
}