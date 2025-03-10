import { Navigate, Outlet } from "react-router-dom"
import { route } from "."
import { UseAuth } from "@/context/auth-context"

export const ProtectedRoute = () => {
    const { isLoggedIn  }  = UseAuth()

    if (!isLoggedIn) return <Navigate to={route.login} replace />

    return <Outlet />
}
