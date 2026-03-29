import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light')
    const [isLoading, setIsLoading] = useState(true)

    // Initialize theme from localStorage on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light'
        setTheme(savedTheme)
        document.documentElement.setAttribute('data-theme', savedTheme)
        setIsLoading(false)
    }, [])

    // Update theme
    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light'
            localStorage.setItem('theme', newTheme)
            document.documentElement.setAttribute('data-theme', newTheme)
            return newTheme
        })
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isLoading }}>
            {children}
        </ThemeContext.Provider>
    )
}
