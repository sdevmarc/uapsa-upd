import { HOST } from '@/constants'
import axios from 'axios'

interface ISignIn {
    email: string
    password: string
}

interface ISignUp {
    idNumber: string
    name: string
    degree: string
    email: string
    password: string
}

export const API_INDEX = async ({ token }: { token: string }) => {
    try {
        const response = await axios.get(`${HOST}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export const API_SIGN_IN = async ({ email, password }: ISignIn) => {
    try {
        const response = await axios.post(`${HOST}/users/login-user`, { email, password })
        return response.data
    } catch (error) {
        throw error
    }
}

export const API_SIGN_UP = async ({ idNumber, name, degree, email, password }: ISignUp) => {
    try {
        const response = await axios.post(`${HOST}/users/create-first-time-user`,
            { idNumber, name, degree, email, password }
        )
        return response.data
    } catch (error) {
        throw error
    }
}

export const API_DATA_QR_HOLDERS = async ({ token }: { token: string }) => {
    try {
        const response = await axios.get(`${HOST}/qr`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export const API_CREAT_QR = async ({ idNumber, name, degree }: { idNumber: string, name: string, degree: string }) => {
    try {
        const response = await axios.post(`${HOST}/qr/create-qr`, {
            idNumber,
            name,
            degree
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export const API_CREATE_ATTENDANCE = async ({ qr }: { qr: string }) => {
    try {
        const response = await axios.post(`${HOST}/attendance/create-attended`, { qr })
        return response.data
    } catch (error) {
        throw error
    }
}

export const API_DATA_QR_HOLDER = async ({ qr }: { qr: string }) => {
    try {
        const response = await axios.get(`${HOST}/qr/${qr}`)
        return response.data
    } catch (error) {
        throw error
    }
}