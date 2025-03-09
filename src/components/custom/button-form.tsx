import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import React from "react";

interface ButtonLoaderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading: boolean;
    defaultText: string;
    type?: "submit" | "button";
    className?: string;
}

export const ButtonForm = React.forwardRef<HTMLButtonElement, ButtonLoaderProps>(
    ({ isLoading, defaultText, type = "submit", className, ...props }, ref) => {
        return (
            <Button
                className={cn(className)}
                type={type}
                disabled={isLoading}
                ref={ref}
                {...props}
            >
                {isLoading ? <p className="animate-pulse animate-infinite">Cargando...</p> : defaultText}
            </Button>
        );
    }
);

ButtonForm.displayName = 'ButtonForm';
