import { DataTable } from '@/components/custom/data-table';
import { ErrorPage } from '@/components/custom/error';
import { ToolbarAction } from '@/components/shared/toolbars';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useFetch } from '@/hooks/useFetch';
import { route } from '@/routes';

export const Vehicles = () => {

    const { data, error, isLoading, refetch } = useFetch('/vasdfasdasehicles');

    if (isLoading) return <div>Loading...</div>;

    if (error) return <ErrorPage mensaje='asdasdasd'/>;

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink to={route.home}>Panel</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Vehiculos</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <ToolbarAction title="Lista de Vehiculos" onRefresh={refetch} />
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
    );
};
