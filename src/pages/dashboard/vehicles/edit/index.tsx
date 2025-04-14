import { ButtonForm } from "@/components/custom/button-form";
import { Inputform } from "@/components/custom/input-form";
import { Selectform } from "@/components/custom/select-form";
import { TextAreaform } from "@/components/custom/textarea-form";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { SelectItem } from "@/components/ui/select";
import { useFetch } from "@/hooks/useFetch";
import { http } from "@/proxys/http";
import { route } from "@/routes";
import { vehicle } from "@/types/vehicles";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const EditVehicle = () => {

    const { id } = useParams<{ id: string }>()

    const { data, error, isLoading: loadingVehicles } = useFetch(`/vehicles/${id}`)
    const { data: owner, error: errorw, isLoading: isloadingw } = useFetch('/owner');
    const { handleSubmit, register, formState: { errors }, setValue, control } = useForm<vehicle>()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (data) {
            const registrationDate = new Date(data.result.registrationDate).toISOString().split('T')[0];
            setValue("registrationDate", registrationDate);
        }
    }, [data, setValue]);

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
        setIsLoading(true)
        http.patch(`/vehicles/${id}`, dataForm)
            .then(() => {
                setIsLoading(false)
                toast.success("Vehiculo Editado correctamente")
            }
            ).catch((err) => {
                setIsLoading(false)
                toast.error(err.response.data.error)
            })
    }

    if (loadingVehicles || isloadingw) return <Loader />;

    if (error || errorw) return <div>Error...</div>;

    console.log(data.result.registrationDate)

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
                        <BreadcrumbPage>Editar</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Card className="p-5 space-y-5 mt-5">
                <h1 className="text-xl font-bold">Editar Vehículo</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                    <Inputform
                        title="Modelo"
                        placeholder="Ingresa el Modelo"
                        defaultValue={data?.result?.model}
                        {...register("model", { required: true })}
                        error={errors.model && "El campo es requerido"}
                    />

                    <Inputform
                        title="Placa"
                        placeholder="Ingresa la placa"
                        defaultValue={data?.result?.licensePlate}
                        {...register("licensePlate", { required: true })}
                        error={errors.licensePlate && "El campo es requerido"}
                    />
                    <Inputform
                        title="Marca del Vehiculo"
                        placeholder="Ingresa la marca"
                        defaultValue={data?.result?.make}
                        {...register("make", { required: true })}
                        error={errors.make && "El campo es requerido"}
                    />

                    <Inputform
                        title="Categoria"
                        placeholder="Ingresa la categoria"
                        defaultValue={data?.result?.category}
                        {...register("category", { required: true })}
                        error={errors.category && "El campo es requerido"}
                    />

                    <Inputform
                        title="Año"
                        type="number"
                        placeholder="Ingresa el producto"
                        defaultValue={data?.result?.year}
                        {...register("year", { required: true })}
                        error={errors.year && "El campo es requerido"}
                    />

                    <Inputform
                        title="Dia de Registro"
                        type="date"
                        placeholder="Ingresa el la fecha de registro"
                        defaultValue={data?.result?.registrationDate}
                        {...register("registrationDate", { required: true })}
                        error={errors.registrationDate && "El campo es requerido"}
                    />

                    <Controller
                        name="ownerId"
                        control={control}
                        rules={{ required: true }}
                        defaultValue={data?.result?.owner.id}
                        render={({ field }) => (
                            <Selectform {...field}
                                title="Propietario"
                                className="min-w-64"
                                placeholder="Selecciona al Propietario"
                                onValueChange={(value: string) => field.onChange(value)}
                                error={errors.ownerId && "La Tienda es requerido"}
                            >
                                {owner.result.map((owner: { id: string; name: string; lastName: string }) => (
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
                        defaultValue={data?.result?.status}
                        {...register("status", { required: true })}
                        error={errors.status && "El campo es requerido"}
                    />

                    <TextAreaform
                        containerClassName="col-span-full"
                        placeholder="Ingresa las notas"
                        title="Notas"
                        defaultValue={data?.result?.notes}
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
            </Card>
        </>
    );
}
