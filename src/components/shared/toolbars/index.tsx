
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

interface ToolbarActionProps {
    title: string;
    onRefresh: () => void;
}

const className = "flex justify-between items-center py-4"

export const ToolbarAction = ({ title, onRefresh }: ToolbarActionProps) => {

    const { pathname } = useLocation()

    return (
        <div className={cn(`${className}`)}>
            <div>
                <h2 className="text-md lg:text-xl font-bold uppercase">{title}</h2>
            </div>
            <div className="space-x-2">
                <Link to={pathname + '/create'}>
                    <Button>
                        Agregar
                    </Button>
                </Link>
                <Button variant={"outline"} onClick={onRefresh}>
                    Actualizar
                </Button>
            </div>
        </div>
    )
}
