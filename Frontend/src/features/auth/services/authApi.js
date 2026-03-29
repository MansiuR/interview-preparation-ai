import axios from "axios"

const getBaseURL = () => {
    if (import.meta.env.DEV) {
        return "http://localhost:3000"
    }
    // For production, use the same origin (backend and frontend are served from same domain)
    return window.location.origin
}

const api = axios.create({
    baseURL: getBaseURL(),
    withCredentials: true
})

export async function register({ username, email, password }) {

    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })

        return response.data

    } catch (err) {
        console.log(err)
        throw err
    }

}

export async function login({ email, password }) {

    try {

        const response = await api.post("/api/auth/login", {
            email, password
        })

        return response.data

    } catch (err) {
        console.log(err)
        throw err
    }

}

export async function logout() {
    try {

        const response = await api.get("/api/auth/logout")

        return response.data

    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function getMe() {

    try {

        const response = await api.get("/api/auth/get-me")

        return response.data

    } catch (err) {
        if (err.response?.status === 401) {
            return null
        }
        console.log(err)
        return null
    }

}