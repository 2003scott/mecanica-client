import { route } from './routes';
import { AuthProvider } from './context/auth-context';
import { Toaster } from 'sonner';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Account, Create, CreateOwner, EditOwner, EditVehicle, Error, Home, Login, Owners, Signup, Vehicles } from './pages';
import { ReactQueryProvider } from './providers/query-provider';
import { ProtectedRoute } from './routes/routes';

function App() {
    return (
        <AuthProvider>
            <ReactQueryProvider>
                <Toaster expand={false} richColors />
                <BrowserRouter>
                    <Routes>
                        <Route path={route.login} element={<Login />} />
                        <Route path={route.crearCuenta} element={<Signup />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path={route.home} element={<Home />} />
                            <Route path={route.vehicles} element={<Vehicles />} />
                            <Route path={route.create} element={<Create />} />
                            <Route path={route.vehiclesEdit} element={<EditVehicle />} />
                            <Route path={route.account} element={<Account />} />
                            <Route path={route.owners} element={<Owners />} />
                            <Route path={route.ownersCreate} element={<CreateOwner />} />
                            <Route path={route.ownersEdit} element={<EditOwner />} />
                            {/* Nested routes */}
                            <Route path="*" element={<Error />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ReactQueryProvider>
        </AuthProvider>
    );
}

export default App;
