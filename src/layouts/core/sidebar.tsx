import { useSidebarToggle } from "@/store/sidebar-store";
import { useStore } from "@/store/use-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { SidebarToggle } from "./sidebar-toogle";
import { Menu } from "./menu";
import { route } from "@/routes";
import { Car } from "lucide-react";


export const Sidebar = () => {

    const sidebar = useStore(useSidebarToggle, (state) => state);

    if (!sidebar) return null;

    return (
        <aside
            className={cn(
                "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
                sidebar?.isOpen === false ? "w-[90px]" : "w-72"
            )}
        >
            <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
            <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
                <Button
                    className={cn(
                        "transition-transform ease-in-out duration-300 mb-1",
                        sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
                    )}
                    variant="link"
                    asChild
                >
                    <Link href={route.home} className="flex items-center gap-2">
                        <Car height={65} width={65}/>
                        <h1
                            className={cn(
                                "font-bold text-xs whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                                sidebar?.isOpen === false
                                    ? "-translate-x-96 opacity-0 hidden"
                                    : "translate-x-0 opacity-100"
                            )}
                        >
                            PANEL
                        </h1>
                    </Link>
                </Button>
                <Menu isOpen={sidebar?.isOpen} />
            </div>
        </aside>
    )
}
