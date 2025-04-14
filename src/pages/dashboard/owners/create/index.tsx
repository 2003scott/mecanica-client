import { ButtonForm } from "@/components/custom/button-form"
import { Inputform } from "@/components/custom/input-form"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Card } from "@/components/ui/card"
import { http } from "@/proxys/http"
import { route } from "@/routes"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface FormData {
    name: string
    lastName: string
    secondLastName: string
    documentNumber: string
    phoneNumber: string
    email: string
    middleName: string
}

export const CreateOwner = () => {

    const { handleSubmit, register, formState: { errors }, reset } = useForm<FormData>()
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async (data: FormData) => {
        const form = {
            name: data.name,
            middleName: data.middleName,
            lastName: data.lastName,
            secondLastName: data.secondLastName,
            documentType: "DNI",
            documentNumber: data.documentNumber,
            phoneNumber: data.phoneNumber,
            email: data.email,
        }
        setIsLoading(true)
        http.post('/owner', form)
            .then(() => {
                setIsLoading(false)
                toast.success('Propietario creado correctamente')
                reset()
            })
            .catch((err) => {
                setIsLoading(false)
                toast.error(err.response.data.error)
                console.log(err)
            })
    }

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink to={route.home}>Panel</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink to={route.owners}>Propietarios</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Crear</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Card className="p-5 space-y-5 mt-5">
                <h1 className="text-xl font-bold">Nuevo Propietario</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                    <Inputform
                        title="Primer Nombre"
                        placeholder="Ingresa el nombre"
                        {...register("name", { required: true })}
                        error={errors.name && "El campo es requerido"}
                    />

                    <Inputform
                        title="Segundo Nombre"
                        placeholder="Ingresa el nombre"
                        {...register("middleName", { required: true })}
                        error={errors.middleName && "El campo es requerido"}
                    />

                    <Inputform
                        title="Apellido Paterno"
                        placeholder="Ingresa el apellido"
                        {...register("lastName", { required: true })}
                        error={errors.lastName && "El campo es requerido"}
                    />
                    <Inputform
                        title="Apellido Materno"
                        placeholder="Ingresa el apellido"
                        {...register("secondLastName", { required: true })}
                        error={errors.secondLastName && "El campo es requerido"}
                    />

                    <Inputform
                        title="DNI"
                        placeholder="Ingresa el DNI"
                        {...register("documentNumber", { required: true })}
                        error={errors.documentNumber && "El campo es requerido"}
                    />

                    <Inputform
                        title="Telefono"
                        type="number"
                        placeholder="Ingresa el telefono"
                        {...register("phoneNumber", { required: true })}
                        error={errors.phoneNumber && "El campo es requerido"}
                    />

                    <Inputform
                        title="Email"
                        type="email"
                        placeholder="Ingresa el email"
                        {...register("email", { required: true })}
                        error={errors.email && "El campo es requerido"}
                    />

                    <ButtonForm
                        defaultText="Guardar"
                        className="col-span-full"
                        isLoading={isLoading}
                        type="submit"
                    />

                </form>
            </Card>
        </>
    )
}
