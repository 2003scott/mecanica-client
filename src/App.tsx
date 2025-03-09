import { route } from './routes';
import { AuthProvider } from './context/auth-context';
import { Toaster } from 'sonner';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EditVehicle, Error, Home, Login, Signup, Vehicles } from './pages';
import { MainLayout } from './layouts/main-layout';
import { ReactQueryProvider } from './providers/query-provider';

function App() {
    return (
        <AuthProvider>
            <ReactQueryProvider>
                <Toaster expand={false} richColors />
                <BrowserRouter>
                    <MainLayout>
                        <Routes>
                            <Route path={route.login} element={<Login />} />
                            <Route path={route.home} element={<Home />} />
                            <Route path={route.crearCuenta} element={<Signup />} />
                            {/* Router vehicles */}
                            <Route path={route.vehicles} element={<Vehicles />} />
                            <Route path={route.vehiclesEdit} element={<EditVehicle />} />
                            {/* Router 404 */}
                            <Route path="*" element={<Error />} />
                        </Routes>
                    </MainLayout>
                </BrowserRouter>
            </ReactQueryProvider>
        </AuthProvider>
    );
}

export default App;
