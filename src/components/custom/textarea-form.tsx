import { Textarea } from "@/components/ui/textarea";
import React from "react"

type Props = {
    title: string;
    placeholder: string;
    containerClassName?: string;
    error?: string | undefined;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

const TextAreaform = React.forwardRef<HTMLTextAreaElement, Props>(({ error, containerClassName = "", title, placeholder, ...props }, ref) => {
    return (
        <div className={`${containerClassName} space-y-1 w-full`} >
            <label className="select-none space-y-1 text-[0.9rem] font-medium">
                <p>{title}</p>
                <Textarea {...props} ref={ref}
                    placeholder={placeholder}
                />
            </label>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    )
})

TextAreaform.displayName = 'TextAreaform'

export { TextAreaform }
