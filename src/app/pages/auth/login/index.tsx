
import { Button } from "@/components/ui/button"
import { UseAuth } from "@/app/context/auth-context"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Inputform } from "@/components/custom/input-form"
import { http } from "@/app/proxys/http"
import { CarIcon } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

interface LoginResponse {
    success: boolean;
    result: {
        token: string;
        expiresAt: number;
    };
}


export const Login = () => {

    const navigate = useNavigate()
    const { login } = UseAuth()
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const onSubmit = (data: any) => {
        http.post<LoginResponse>("/users/login", {
            username: data.username,
            password: data.password
        })
            .then((e) => {
                const { token } = e.data.result;

                if (token) {
                    toast.success("Inicio de sesión exitoso");
                    navigate("/");
                } else {
                    toast.error("No se recibió un token.");
                }
            })
            .catch((e) => {
                toast.error("Error al iniciar sesión");
                console.log("Error:", e);
            });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-cover bg-center bg-primary">
            <div className="mx-auto w-full max-w-md space-y-8 rounded-lg bg-background p-8 shadow-2xl xs:px-2">
                <div className="flex flex-col items-center justify-center space-y-2">
                    <CarIcon className="h-12 w-12 text-primary" />
                    <h1 className="text-3xl font-bold tracking-tight">Bienvenido a AutoApp</h1>
                    <p className="text-muted-foreground">Inicia sesión para continuar</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Inputform
                        title="usuario"
                        placeholder="Ingresa tu nombre de usuario"
                        {...register('username', { required: true })}
                        error={errors && errors.username && 'El usuario es requerido'}
                    />
                    <Inputform
                        title="Contraseña"
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        {...register('password', { required: true })}
                        error={errors && errors.password && 'La contraseña es requerida'}
                    />
                    <Button type="submit" className="w-full">
                        Iniciar sesión
                    </Button>
                    <Button variant="link" type="button">
                        <Link to="/crearCuenta">
                            ¿No tienes usuario y contraseña?
                        </Link>
                    </Button>
                </form>
            </div>
        </div>
    )
}
