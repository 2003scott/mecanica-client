import React, { createContext, useContext, useEffect, useState } from "react";
import { Auth } from "../types/auth";
import { http } from "../proxys/http";

interface AuthContextType {
    isLoggedIn: boolean;
    user: Auth | null;
    login: (user: Auth) => void;
    loginUserName: (username: string, password: string) => void;
    logout: () => void;
}

interface LoginResponse {
    result: {
        token: string;
        refreshToken: string;
        user: {
            username: string;
        }
    }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const UseAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe estar en provider");
    }
    return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<Auth | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, [isLoggedIn]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        const storedRefreshToken = localStorage.getItem("refreshToken");

        if (storedUser && storedToken && storedRefreshToken) {
            setIsLoggedIn(true);
            setUser(JSON.parse(storedUser));

            http.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
        setIsLoading(false);
    }, []);

    const loginUserName = async (username: string, password: string) => {
        try {
            const response = await http.post<LoginResponse>("/users/login", { username, password });

            if (response.status === 200 || response.status === 201) {
                const { token, refreshToken } = response.data.result;

                localStorage.setItem("token", token);
                localStorage.setItem("refreshToken", refreshToken);

                const userData: Auth = {
                    username,
                    token,
                    result: {
                        username: undefined
                    }
                };

                login(userData);

                http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                return;
            }

            throw new Error("Credenciales inválidas");
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            throw error;
        }
    };

    const login = (usuario: Auth): void => {
        setUser(usuario);
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(usuario));
    };

    const logout = (): void => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        delete http.defaults.headers.common['Authorization'];
    };

    const value: AuthContextType = {
        isLoggedIn,
        user,
        login,
        loginUserName,
        logout,
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
