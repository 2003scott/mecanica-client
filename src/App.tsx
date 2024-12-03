import { route } from './routes'
import { AuthProvider } from './app/context/auth-context'
import { Toaster } from "sonner"
import { Home } from './app/pages/home'
import Error from './app/pages/error'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login, Signup } from './app/pages/auth'

function App() {
    return (
        <AuthProvider>
            <Toaster expand={false} />
            <BrowserRouter>
                <Routes>
                    <Route path={route.login} element={<Login/>} />
                    <Route path={route.home} element={<Home/>} />
                    <Route path={route.crearCuenta} element={<Signup/>} />
                    {/* Router 404 */}
                    <Route path="*" element={<Error/>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
