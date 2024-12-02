"use client"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip";
import { useEffect, useState } from "react";

export const ModeToggle = () => {

    const storedTheme = typeof window !== 'undefined' ? localStorage.getItem("theme") || "light" : "dark"
    const [theme, setTheme] = useState(storedTheme)

    useEffect(() => {
        if ( theme === "dark" ) {
            const htmlElement = document.querySelector("html")
            if (htmlElement) {
                htmlElement.classList.add("dark")
            }
        }else {
            const htmlElement = document.querySelector("html")
            if (htmlElement) {
                htmlElement.classList.remove("dark")
            }
        }

        localStorage.setItem("theme", theme)

    },[theme])

    const handleChangeTheme = () => {
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
    }

    return (
        <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Button className="rounded-full size-8 bg-background"
                        variant={"outline"}
                        size={"icon"}
                        onClick={handleChangeTheme}
                    >
                        <SunIcon className="w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100" />
                        <MoonIcon className="absolute w-[1.2rem] h-[1.2rem] rotate-0 scale-1000 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0" />
                        <span className="sr-only">Cambiar Tema</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Cambiar Tema</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
