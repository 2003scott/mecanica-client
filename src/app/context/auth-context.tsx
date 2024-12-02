import React, { createContext, useContext, useEffect, useState } from "react";
import { Auth } from "../domain/auth";

interface AuthContextType {
    isLoggedIn: boolean;
    user: Auth | null
    login: (user: Auth) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const UseAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth debe estar en provider")
    }
    return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [user, setUser] = useState<Auth | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(
        () => {
            const storedIsLoggedIn = localStorage.getItem('isLoggedIn')
            const storedUser = localStorage.getItem('user')

            if (storedIsLoggedIn && storedUser) {
                setIsLoggedIn(storedIsLoggedIn === 'true')
                setUser(JSON.parse(storedUser))
            }
            setIsLoading(false)
        }, []
    )

    const login = (usuario: Auth): void => {
        setUser(usuario)
        setIsLoggedIn(true)
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('user', JSON.stringify(usuario))
    }

    const logout = (): void => {
        setUser(null)
        setIsLoggedIn(false)
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('user')
    }
    const value: AuthContextType = {
        isLoggedIn,
        user,
        login,
        logout
    }

    if (isLoading) {
        return <p>loading ...</p>
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
