import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectTrigger, SelectValue } from "../ui/select"
import React from "react"

type Props = {
    children: React.ReactNode;
    title?: string;
    placeholder?: string;
    className?: string;
    error?: string | undefined;
    onValueChange: any;
    value?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>

const Selectform = React.forwardRef<HTMLSelectElement, Props>(({ error, onValueChange, children, value, className = "", title, placeholder, ...props }, ref) => {
    return (
        <div className={cn(`space-y-1 w-full`,className)} >
            <label className="select-none space-y-1 text-[0.9rem] font-medium">
                <p>{title}</p>
                <Select onValueChange={(selectedValue) => onValueChange && onValueChange(selectedValue)} value={value}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={placeholder} ref={ref} {...props} />
                    </SelectTrigger>
                    <SelectContent>
                        {children}
                    </SelectContent>
                </Select>
            </label>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    )
})

Selectform.displayName = 'Selectform'

export { Selectform }
