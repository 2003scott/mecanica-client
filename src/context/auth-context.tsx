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
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        const storedRefreshToken = localStorage.getItem("refreshToken");

        if (storedUser && storedToken && storedRefreshToken) {
            setIsLoggedIn(true);
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);



    const loginUserName = async (username: string, password: string) => {
        try {
            const response: any = await http.post("/users/login", { username, password });
            const { token } = response.data.result;
            login({ username, token });
            if (response.status === 401) {
                const refresh = await refreshToken();
                if (refresh) {
                    localStorage.setItem("refreshToken", refresh);
                    setUser(user);
                    setIsLoggedIn(true);

                    localStorage.setItem("token", token);
                    localStorage.setItem("user", JSON.stringify(user));
                }
            }
            else {
                throw new Error("No se recibieron los tokens.");
            }


        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            throw error;
        }
    };



    const refreshToken = async () => {
        const token = localStorage.getItem("token");

        try {
            const response: any = await http.post("/users/refresh-token", {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                const { token } = response.data.result;
                return token;
            } else {
                throw new Error("Error inesperado en la autenticación.");
            }
        } catch (error) {
            console.error("Error al refrescar el token:", error);
        }
    }




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
