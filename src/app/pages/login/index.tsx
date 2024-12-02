import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link, useLocation } from "wouter"
import { SVGProps } from "react"
import { JSX } from "react/jsx-runtime"
import { UseAuth } from "@/app/context/auth-context"
import { useForm } from "react-hook-form"
import session from "../../../../sesions.json"
import { toast } from "sonner"
import { Inputform } from "@/components/custom/input-form"

export const Login = () => {

    const [, navigate] = useLocation()
    const { login } = UseAuth()
    const { register, handleSubmit, reset, formState : { errors } } = useForm()
    const onSubmit = (data: any) => {
        for (const usuario of session.usuarios) {
            if (data.user === usuario.user && data.password === usuario.password) {
                login(usuario)
                navigate("/")
                toast.success('Bienvenido al panel')
                return
            }
            reset()
            toast.error('Usuario o contraseña incorrectos')
        }
    }

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
                        {...register('user', { required: true })}
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
                        Iniciar sesión
                    </Button>
                </form>
            </div>
        </div>
    )
}

function CarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
            <circle cx="7" cy="17" r="2" />
            <path d="M9 17h6" />
            <circle cx="17" cy="17" r="2" />
        </svg>
    )
}
