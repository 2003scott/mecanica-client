import { ButtonForm } from "@/components/custom/button-form"
import { Inputform } from "@/components/custom/input-form"
import { Loader } from "@/components/custom/loader"
import { Selectform } from "@/components/custom/select-form"
import { TextAreaform } from "@/components/custom/textarea-form"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { SelectItem } from "@/components/ui/select"
import { useFetch } from "@/hooks/useFetch"
import { http } from "@/proxys/http"
import { route } from "@/routes"
import { vehicle } from "@/types/vehicles"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

export const Create = () => {

    const { handleSubmit, register, formState: { errors }, reset, control, setValue } = useForm<vehicle>()
    const { data, error, isLoading } = useFetch('/owner');
    const [isLoadings, setIsLoadings] = useState(false)

    const onSubmit = async (data: vehicle) => {
        const dataForm = {
            make: data.make,
            model: data.model,
            year: parseInt(data.year.toString()),
            category: data.category,
            licensePlate: data.licensePlate,
            registrationDate: data.registrationDate,
            notes: data.notes,
            ownerId: data.ownerId,
            status: data.status,
        }
        setIsLoadings(true)
        http.post('/vehicles', dataForm)
            .then(() => {
                setIsLoadings(false)
                toast.success("Vehiculo creado correctamente")
                setValue("ownerId", "")
                reset()
            }
            ).catch((err) => {
                setIsLoadings(false)
                toast.error(err.response.data.error)
            })
    }

    if (isLoading) return <Loader />
    if (error) return <p>Error al cargar los propietarios</p>

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

                    <Controller
                        name="ownerId"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Selectform {...field}
                                title="Propietario"
                                className="min-w-64"
                                placeholder="Selecciona al Propietario"
                                onValueChange={(defaultValue: string) => field.onChange(defaultValue)}
                                error={errors.ownerId && "La Tienda es requerido"}
                            >
                                {data.result.map((owner: { id: string; name: string; lastName: string }) => (
                                    <SelectItem key={owner.id} value={owner.id}>
                                        {owner.name} {owner.lastName}
                                    </SelectItem>
                                ))}
                            </Selectform>
                        )}
                    />

                    <Inputform
                        title="Estado del Vehiculo"
                        placeholder="Ingresa el estado del vehiculo"
                        {...register("status", { required: true })}
                        error={errors.status && "El campo es requerido"}
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
                        isLoading={isLoadings}
                        type="submit"
                    />

                </form>
            </div>
        </>
    );
}

