import { Button } from "@/components/ui/button"
import { UseAuth } from "@/app/context/auth-context"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Inputform } from "@/components/custom/input-form"
import { http } from "@/app/proxys/http"
import { CarIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const Signup = () => {

    const navigate = useNavigate()
    const { login } = UseAuth()
    const { register, handleSubmit, reset, formState : { errors } } = useForm()

    const onSubmit = (data: any) => {
        http.post("/users", {
            username: data.username,
            password: data.password
        })
            .then(() => {
                toast.success("Cuenta creada exitosamente");
                console.log("Usuario creado:");
                navigate("/login");
            })
            .catch(() => {
                toast.error("Error al crear la cuenta");
                console.error("Error");
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
                </form>
            </div>
        </div>
    )
}
