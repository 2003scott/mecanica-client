import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "@/components/ui/button";

interface DialogFormProps {
    children: React.ReactNode;
    title?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    onPress: () => void;
}

export const DialogForm = ({ children, title, variant, onPress }: DialogFormProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl space-y-5">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        ¿Estás seguro de que quieres hacer esto? No podrás deshacer esta acción.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Cerrar
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="button" onClick={() => onPress()} variant={variant}>
                            Eliminar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
