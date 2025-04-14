import { DataTable } from '@/components/custom/data-table';
import { ErrorPage } from '@/components/custom/error';
import { Loader } from '@/components/custom/loader';
import { ToolbarAction } from '@/components/shared/toolbars';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useFetch } from '@/hooks/useFetch';
import { route } from '@/routes';

export const Owners = () => {

    const { data, error, isLoading, refetch } = useFetch('/owner');

    if (isLoading) return <Loader />;

    if (error) return <ErrorPage mensaje='asdasdasd'/>;

    const Apellidos = (row: { lastName: string, secondLastName : string } ) => {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <p className="capitalize w-32 truncate">
                            {`${row.lastName} ${row.secondLastName}`.toLowerCase()}
                        </p>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="capitalize">{`${row.lastName} ${row.secondLastName}`.toLowerCase()}</p>
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
                        <BreadcrumbPage>Propietarios</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <ToolbarAction title="Lista de Vehiculos" onRefresh={refetch} />
            <DataTable value={data?.result}>
                <DataTable.Column header="Id" field="id" />
                <DataTable.Column header="Nombre" field="name" />
                <DataTable.Column header="Apellidos" body={Apellidos} />
                <DataTable.Column header="DNI" field="documentNumber" />
                <DataTable.Column header="Telefono" field="phoneNumber" />
                <DataTable.Column header="Email" field="email" />
                <DataTable.Column header="Acciones" body={(row) => <DataTable.Actions {...row} edit delete />} />
            </DataTable>
        </>
    );
};
