"use client"

import { ButtonForm } from "@/components/custom/button-form"
import { Inputform } from "@/components/custom/input-form"
import { Selectform } from "@/components/custom/select-form"
import { SelectItem } from "@radix-ui/react-select"
import axios from "axios"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"


export const Create=({ })=> {

    const { handleSubmit, register, formState: { errors }, reset, control, setValue } = useForm<any>()
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async (formdata: any) => {
        setIsLoading(true)
        const product = {
            name: formdata.name,
            status: formdata.status,
            vendor: formdata.vendor
        }
        axios.post('', product)
            .then(() => {
                reset()
                setValue("vendor", "")
                setValue("status", "")
                setIsLoading(false)
                toast.success('Producto creado correctamente')
            })
            .catch(() => {
                toast.error("Error al crear el producto")
                setIsLoading(false)
            })
    }

    return (
        <>

            <div className="py-5 space-y-5">
                <h1 className="text-xl font-bold">Nuevo Vehículo</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                    <Inputform
                        title="Producto"
                        placeholder="Ingresa el producto"
                        {...register("name", { required: true })}
                        error={errors.name && "El campo es requerido"}
                    />
                    <Controller
                        name="vendor"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Selectform {...field}
                                title="Tienda"
                                className="min-w-64"
                                placeholder="Selecciona la tienda"
                                onValueChange={(defaultValue: any) => field.onChange(defaultValue)}
                                error={errors.vendor && "La Tienda es requerido"}
                            >
                                <SelectItem value="shopimax">rrrrr</SelectItem>
                                <SelectItem value="deprimera">De Primera</SelectItem>
                                <SelectItem value="maximportaciones">Max Importaciones</SelectItem>
                            </Selectform>
                        )}
                    />
                    <Controller
                        name="status"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Selectform {...field}
                                title="Estado"
                                className="min-w-64"
                                placeholder="Selecciona un estado"
                                onValueChange={(defaultValue: any) => field.onChange(defaultValue)}
                                error={errors.vendor && "El estado es requerido"}
                            >
                                <SelectItem value="active">Activo</SelectItem>
                                <SelectItem value="draft">draft</SelectItem>
                            </Selectform>
                        )}
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

