import { ButtonForm } from "@/components/custom/button-form"
import { Inputform } from "@/components/custom/input-form"
import { TextAreaform } from "@/components/custom/textarea-form"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { http } from "@/proxys/http"
import { route } from "@/routes"
import { vehicle } from "@/types/vehicles"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export const Create = () => {

    const { handleSubmit, register, formState: { errors }, reset } = useForm<vehicle>()
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async (data: vehicle) => {
        const dataForm = {
            make: data.make,
            model: data.model,
            year: parseInt(data.year.toString()),
            category: data.category,
            licensePlate: data.licensePlate,
            registrationDate: data.registrationDate,
            notes: data.notes
        }
        setIsLoading(true)
        http.post('/vehicles', dataForm)
            .then(() => {
                setIsLoading(false)
                toast.success("Vehiculo creado correctamente")
                reset()
            }
            ).catch(() => {
                setIsLoading(false)
                toast.error("Error al crear el vehiculo")
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
                        <BreadcrumbLink to={route.vehicles}>Vehiculos</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Crear</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="py-5 space-y-5">
                <h1 className="text-xl font-bold">Nuevo Vehículo</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                    <Inputform
                        title="Modelo"
                        placeholder="Ingresa el Modelo"
                        {...register("model", { required: true })}
                        error={errors.model && "El campo es requerido"}
                    />

                    <Inputform
                        title="Placa"
                        placeholder="Ingresa la placa"
                        {...register("licensePlate", { required: true })}
                        error={errors.licensePlate && "El campo es requerido"}
                    />
                    <Inputform
                        title="Marca del Vehiculo"
                        placeholder="Ingresa la marca"
                        {...register("make", { required: true })}
                        error={errors.make && "El campo es requerido"}
                    />

                    <Inputform
                        title="Categoria"
                        placeholder="Ingresa la categoria"
                        {...register("category", { required: true })}
                        error={errors.category && "El campo es requerido"}
                    />

                    <Inputform
                        title="Año"
                        type="number"
                        placeholder="Ingresa el producto"
                        {...register("year", { required: true })}
                        error={errors.year && "El campo es requerido"}
                    />

                    <Inputform
                        title="Dia de Registro"
                        type="date"
                        placeholder="Ingresa el la fecha de registro"
                        {...register("registrationDate", { required: true })}
                        error={errors.registrationDate && "El campo es requerido"}
                    />


                    <TextAreaform
                        containerClassName="col-span-full"
                        placeholder="Ingresa las notas"
                        title="Notas"
                        {...register("notes", { required: true })}
                        error={errors.notes && "El campo es requerido"}
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
    );
}

