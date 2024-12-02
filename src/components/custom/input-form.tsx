import { Input } from "@/components/ui/input";
import React from "react"
import { Label } from "../ui/label";

type Props = {
    id?: string;
    children?: React.ReactNode;
    title: string;
    containerClassName?: string;
    error?: string | undefined;
} & React.InputHTMLAttributes<HTMLInputElement>

const Inputform = React.forwardRef<HTMLInputElement, Props>(({ error, id, title, containerClassName = "", children, ...props }, ref) => {
    return (
        <div className={`${containerClassName} space-y-1 [&_*]:w-full`}>
            <Label className="select-none space-y-1 text-[0.9rem] font-medium" htmlFor={id}>{title}</Label>
            {children ? children : <Input autoComplete="off" id={id} ref={ref} {...props} />}
            {error && <p className="text-destructive text-sm">{error}</p>}
        </div>
    )
})

Inputform.displayName = 'Inputform'

export { Inputform }
