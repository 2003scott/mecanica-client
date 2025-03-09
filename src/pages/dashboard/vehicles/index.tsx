import { DataTable } from "@/components/custom/data-table"
import { useFetch } from "@/hooks/useFetch"
import { vehicle } from "@/types/vehicles"

export const Vehicles = () => {

    const { data, error, isLoading } = useFetch<vehicle>('/vehicles')

    if (isLoading) return <div>Loading...</div>

    if (error) return <div>bryan: {error.message}</div>

    return (
        <>
            <DataTable value={data}>
                <DataTable.Column header="Imagen" field="title" />
                <DataTable.Column header="Nombre" field="title" />
                <DataTable.Column header="SKU" field="title" />
                <DataTable.Column header="Tienda" field="title" />
                <DataTable.Column header="Estado" field="title" />
                <DataTable.Column header="Precio" field="title" />
                <DataTable.Column header="Acciones" body={(row) => <DataTable.Actions {...row} edit delete />} />
            </DataTable>
        </>
    )
}
