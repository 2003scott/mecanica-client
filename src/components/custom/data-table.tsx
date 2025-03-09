import { Children } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Pencil, Trash } from "lucide-react"
import { DialogForm } from "./dialog-form"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router-dom"
import { http } from "@/proxys/http"
import { toast } from "sonner"
import queryClient from "@/lib/query-client"


interface DataTableColumn<T> {
    header: string;
    field?: keyof T;
    body?: (data: T) => React.ReactNode;
}

interface DataTableProps<T> {
    value: T[];
    children: React.ReactElement<DataTableColumn<T>>[];
    onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
    onRowAction?: (data: T) => void;
}

const getNestedValue = (obj: any, path?: string) => path?.split('.').reduce((acc, part) => acc?.[part], obj)

const DataTable = <T extends object>({ value, children, onRowAction }: DataTableProps<T>) => {
    return value ? (
        <>
            <ScrollArea className="max-h-[71vh]">
                <Table >
                    <TableHeader className="sticky top-0">
                        <TableRow>
                            {Children.map(children, (child: any) => (
                                <TableHead key={child.props.header}>{child.props.header}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {value?.length > 0 ? (
                            value.map((item, index) => (
                                <TableRow
                                    className="hover:bg-muted cursor-pointer"
                                    key={index}
                                    onClick={() => onRowAction?.(item)}
                                >
                                    {Children.map(children, ({ props: { field, body } }, index) => (
                                        <TableCell className="capitalize" key={index}>
                                            {getNestedValue(item, field as string) || body?.(item) || '........'}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={children.length} className="text-center">
                                    No hay datos para mostrar
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </>
    ) : (
        <DataTable.Skeleton columns={Children.map(children, ({ props }) => props.header)} />
    );
};

DataTable.displayName = 'DataTable'

const DataTableColumn = <T extends object>({ header }: DataTableColumn<T>) => <TableHead>{header}</TableHead>;
DataTableColumn.displayName = 'DataTable.Column'
DataTable.Column = DataTableColumn


const DataTableSkeleton = ({ rows = 10, columns }: { rows?: number; columns: string[] }) => (
    <div className="relative max-h-[80vh]">
        <Table>
            <TableHeader className="sticky top-0">
                <TableRow>
                    {columns.map((_, index) => (
                        <TableHead key={index} className="p-1">
                            <div className="h-4 animate-pulse rounded-md bg-gray-200" />
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {[...Array(rows)].map((_, index) => (
                    <TableRow key={index}>
                        {columns.map((_, index) => (
                            <TableCell key={index}>
                                <div className="h-4 animate-pulse rounded-md bg-gray-200" />
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
)

DataTableSkeleton.displayName = 'DataTable.Skeleton'
DataTable.Skeleton = DataTableSkeleton


const DataTableActions = ({ ...props }) => {
    const id = props?._id || props?.id;

    const { pathname } = useLocation()

    const handleDelete = async () => {
        const path = history.state?.path
        if (!path) {
            toast.error('Error: No se pudo obtener la ruta')
            return
        }
        const endpoint = path
        await http
            .delete(`${endpoint}/${id}`)
            .then(() => {
                toast.success('Eliminado correctamente')
                queryClient.refetchQueries()
            })
            .catch(() => {
                toast.error('Error al eliminar')
            })
    }

    return (
        <div className="flex gap-2 text-xl">
            {props.edit && (
                <Link to={`${pathname}/edit/${id}`}>
                    <Button variant={"outline"} size={"icon"} className="text-blue-400">
                        <Pencil size={20} />
                    </Button>
                </Link>
            )}
            {props?.delete && (
                <DialogForm title="Eliminar" variant="destructive" onPress={handleDelete}>
                    <Button variant={"outline"} size={"icon"} className="text-red-400">
                        <Trash size={20} />
                    </Button>
                </DialogForm>
            )}
        </div>
    );
};

DataTableActions.displayName = "DataTable.Actions";
DataTable.Actions = DataTableActions

export { DataTable }
