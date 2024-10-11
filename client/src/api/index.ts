import { HOST } from '@/constants'
import axios from 'axios'

interface ISignIn {
    email: string
    password: string
}

interface ISignUp {
    name: string
    email: string
    password: string
    role: string
}

export const API_INDEX = async ({ token }: { token: string }) => {
    const response = await axios.get(`${HOST}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const API_USER_EXIST = async () => {
    const response = await axios.get(`${HOST}/users/users-exist`)
    return response.data
}

export const API_DATA_USER_MANAGEMENT = async ({ token }: { token: string }) => {
    const response = await axios.get(`${HOST}/users`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const API_SIGN_IN = async ({ email, password }: ISignIn) => {
    const response = await axios.post(`${HOST}/users/login-user`, { email, password })
    return response.data
}

export const API_CREATE_USER = async ({ name, email, password, role }: ISignUp) => {
    const response = await axios.post(`${HOST}/users/create-user`,
        { name, email, password, role }
    )
    return response.data
}

export const API_DATA_QR_HOLDERS = async ({ token }: { token: string }) => {
    const response = await axios.get(`${HOST}/qr`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const API_CREATE_QR = async ({ idNumber, name }: { idNumber: string, name: string }) => {
    const response = await axios.post(`${HOST}/qr/create-qr`, {
        idNumber,
        name
    })
    return response.data
}

export const API_CREATE_ATTENDANCE = async ({ qr }: { qr: string }) => {
    const response = await axios.post(`${HOST}/attendance/create-attended`, { qr })
    return response.data
}

export const API_CREATE_POINT = async ({ idNumbers, points }: { idNumbers: string[], points: number }) => {
    const response = await axios.post(`${HOST}/points/add-point`, { idNumbers, points })
    return response.data
}

export const API_FIND_IDNUMBER = async ({ qr }: { qr: string | undefined }) => {
    const response = await axios.get(`${HOST}/qr/find/${qr}`)
    return response.data
}

export const API_DATA_QR_HOLDER = async ({ qr }: { qr: string }) => {
    const response = await axios.get(`${HOST}/qr/${qr}`)
    return response.data
}

export const API_DELETE_USER = async ({ id, token }: { id: string, token: string }) => {
    const response = await axios.post(`${HOST}/users/delete-user`, { id }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const API_DELETE_QR = async ({ qr, token }: { qr: string, token: string }) => {
    const response = await axios.post(`${HOST}/qr/delete-qr`, { qr }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const API_DELETE_MULTIPLE_QR = async ({ idNumber, token }: { idNumber: string[], token: string }) => {
    const response = await axios.post(`${HOST}/qr/delete-multiple-qr`, { idNumber }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const API_LESS_MULTIPLE_POINTS = async ({ idNumber, points, token }: { idNumber: string[], points: number, token: string }) => {
    const response = await axios.post(`${HOST}/qr/less/points`, { idNumber, points }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const API_LESS_MULTIPLE_ATTENDANCE = async ({ idNumber, attended, token }: { idNumber: string[], attended: number, token: string }) => {
    const response = await axios.post(`${HOST}/qr/less/attendance`, { idNumber, attended }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const API_RESET_QR_PROGRESS = async ({ idNumber, token }: { idNumber: string[], token: string }) => {
    const response = await axios.post(`${HOST}/qr/reset-all-progress`, { idNumber }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

//SYSTEM UI
export const API_FIND_SYSTEM_UI = async () => {
    const response = await axios.get(`${HOST}/system`)
    return response.data
}


export const API_UPDATE_SYSTEM_UI = async (formData: FormData) => {
    const response = await axios.post(`${HOST}/system/update-ui`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    })
    return response.data
}