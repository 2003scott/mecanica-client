import { ButtonForm } from "@/components/custom/button-form"
import { Inputform } from "@/components/custom/input-form"
import { Loader } from "@/components/custom/loader"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { useFetch } from "@/hooks/useFetch"
import { http } from "@/proxys/http"
import { route } from "@/routes"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
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

export const EditOwner = () => {

    const { id } = useParams<{ id: string }>()
    const { handleSubmit, register, formState: { errors } } = useForm<FormData>()
    const [isLoading, setIsLoading] = useState(false)
    const { data, error, isLoading: loadingVehicles } = useFetch(`/owner/${id}`)

    console.log(data)

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
        http.patch(`/owner/${id}`, form)
            .then(() => {
                setIsLoading(false)
                toast.success('Propietario creado correctamente')
            })
            .catch((err) => {
                setIsLoading(false)
                toast.error(err.response.data.error)
                console.log(err)
            })
    }

    if (loadingVehicles) return <Loader />
    if (error) return <div>Error...</div>

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
                        <BreadcrumbPage>Editar</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="py-5 space-y-5">
                <h1 className="text-xl font-bold">Editar Propietario</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                    <Inputform
                        title="Primer Nombre"
                        placeholder="Ingresa el nombre"
                        defaultValue={data.result.name}
                        {...register("name", { required: true })}
                        error={errors.name && "El campo es requerido"}
                    />

                    <Inputform
                        title="Segundo Nombre"
                        placeholder="Ingresa el nombre"
                        defaultValue={data.result.middleName}
                        {...register("middleName", { required: true })}
                        error={errors.middleName && "El campo es requerido"}
                    />

                    <Inputform
                        title="Apellido Paterno"
                        placeholder="Ingresa el apellido"
                        defaultValue={data.result.lastName}
                        {...register("lastName", { required: true })}
                        error={errors.lastName && "El campo es requerido"}
                    />
                    <Inputform
                        title="Apellido Materno"
                        placeholder="Ingresa el apellido"
                        defaultValue={data.result.secondLastName}
                        {...register("secondLastName", { required: true })}
                        error={errors.secondLastName && "El campo es requerido"}
                    />

                    <Inputform
                        title="DNI"
                        placeholder="Ingresa el DNI"
                        defaultValue={data.result.documentNumber}
                        {...register("documentNumber", { required: true })}
                        error={errors.documentNumber && "El campo es requerido"}
                    />

                    <Inputform
                        title="Telefono"
                        type="number"
                        placeholder="Ingresa el telefono"
                        defaultValue={data.result.phoneNumber}
                        {...register("phoneNumber", { required: true })}
                        error={errors.phoneNumber && "El campo es requerido"}
                    />

                    <Inputform
                        title="Email"
                        type="email"
                        placeholder="Ingresa el email"
                        defaultValue={data.result.email}
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
            </div>
        </>
    )
}
