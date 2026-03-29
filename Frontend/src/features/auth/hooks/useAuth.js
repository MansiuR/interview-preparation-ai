import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/authApi.js";



export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading, error, setError } = context


    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        setError(null)
        try {
            const data = await login({ email, password })
            setUser(data.user)
            return true
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Login failed"
            setError(errorMessage)
            console.log("Login error:", errorMessage)
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        setError(null)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
            return true
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Registration failed"
            setError(errorMessage)
            console.log("Register error:", errorMessage)
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
            setError(null)
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Logout failed"
            console.log("Logout error:", errorMessage)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        const getAndSetUser = async () => {
            try {

                const data = await getMe()
                if (data?.user) {
                    setUser(data.user)
                } else {
                    setUser(null)
                }
            } catch (err) {
                console.log(err)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    }, [])

    return { user, loading, error, handleRegister, handleLogin, handleLogout }
}