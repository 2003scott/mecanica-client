import { DataTable } from '@/components/custom/data-table';
import { ErrorPage } from '@/components/custom/error';
import { Loader } from '@/components/custom/loader';
import { ToolbarAction } from '@/components/shared/toolbars';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useFetch } from '@/hooks/useFetch';
import { route } from '@/routes';

export const Vehicles = () => {

    const { data, error, isLoading, refetch } = useFetch('/vehicles');

    if (isLoading) return <Loader />;

    if (error) return <ErrorPage mensaje='asdasdasd'/>;

    const Notes = (row: { notes: string } ) => {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <p className="capitalize w-44 truncate">
                            {`${row.notes}`.toLowerCase()}
                        </p>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="capitalize">{`${row.notes}`.toLowerCase()}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
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
                <DataTable.Column header="Notas" body={Notes} />
                <DataTable.Column header="Acciones" body={(row) => <DataTable.Actions {...row} edit delete />} />
            </DataTable>
        </>
    );
};
