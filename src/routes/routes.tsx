import { Navigate, Outlet } from "react-router-dom"
import { route } from "."
import { UseAuth } from "@/context/auth-context"
import { MainLayout } from "@/layouts/main-layout"

export const ProtectedRoute = () => {
    const { isLoggedIn } = UseAuth()

    if (!isLoggedIn) return <Navigate to={route.login} replace />

    console.log("isLoggedIn", isLoggedIn)

    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    )
}
