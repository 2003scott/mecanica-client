import { DataTable } from "@/components/custom/data-table"
import { useFetch } from "@/hooks/useFetch"

export const Vehicles = () => {

    const { data, error, isLoading } = useFetch('/vehicles')

    if (isLoading) return <div>Loading...</div>

    if (error) return <div>bryan: {error.message}</div>

    return (
        <>
            <DataTable value={data?.result}>
                <DataTable.Column header="Id" field="id" />
                <DataTable.Column header="Modela" field="model" />
                <DataTable.Column header="Placa" field="licensePlate" />
                <DataTable.Column header="categoria" field="category" />
                <DataTable.Column header="Año" field="year" />
                <DataTable.Column header="Notas" field="notes" />
                <DataTable.Column header="Acciones" body={(row) => <DataTable.Actions {...row} edit delete />} />
            </DataTable>
        </>
    )
}
