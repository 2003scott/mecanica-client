import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Inputform } from "@/components/custom/input-form"
import { http } from "@/proxys/http"
import { CarIcon } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

interface UserResponse {
    success: boolean;
    result: {
        id: string;
        username: string;
        password: string;
        status: string;
        token: string | null;
    };
}


export const Signup = () => {

    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data: any) => {
        http.post<UserResponse>("/users", {
            username: data.username,
            password: data.password
        })
            .then((e) => {
                const token = e.data.result.token;
                return http.post(`/users/confirm/${token}`, {
                    username: data.username
                });

            })
            .then(() => {
                toast.success("Cuenta creada y confirmada exitosamente");
                console.log("Confirmación exitosa");
                navigate("/login");
            })
            .catch((error) => {
                toast.error("Error durante el proceso: " + (error.response?.data?.error || error.message));
                console.log("Error", error);
            });

    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-cover bg-center bg-primary">
            <div className="mx-auto w-full max-w-md space-y-8 rounded-lg bg-background p-8 shadow-2xl xs:px-2">
                <div className="flex flex-col items-center justify-center space-y-2">
                    <CarIcon className="h-12 w-12 text-primary" />
                    <h1 className="text-3xl font-bold tracking-tight">Crear cuenta en AutoApp</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Inputform
                        title="usuario"
                        placeholder="Ingresa tu nombre de usuario"
                        {...register('username', { required: true })}
                        error={errors && errors.user && 'El usuario es requerido'}
                    />
                    <Inputform
                        title="Contraseña"
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        {...register('password', { required: true })}
                        error={errors && errors.password && 'La contraseña es requerida'}
                    />
                    <Button type="submit" className="w-full">
                        Crear usuario
                    </Button>
                    <Button variant="link" type="button">
                        <Link to="/crearCuenta">
                            ¿Tienes cuenta?
                        </Link>
                    </Button>
                </form>
            </div>
        </div>
    )
}
