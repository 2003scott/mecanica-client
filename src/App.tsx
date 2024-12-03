import { Route, Router, Switch } from 'wouter'
import { Login } from './app/pages/login'
import { route } from './routes'
import { AuthProvider } from './app/context/auth-context'
import { Toaster } from "sonner"
import { Home } from './app/pages/home'
import Error from './app/pages/error'
import { CrearCuenta } from './app/pages/crearCuenta'


function App() {
    return (
        <AuthProvider>
            <Toaster expand={false} />
            <Switch>
                <Router>
                    <Route path={route.login} component={Login} />
                    <Route path={route.home} component={Home} />
                    <Route path={route.crearCuenta} component={CrearCuenta} />
                    {/* Router 404 */}
                    <Route path="/:rest*" component={Error} />
                </Router>
            </Switch>
        </AuthProvider>
    )
}

export default App
