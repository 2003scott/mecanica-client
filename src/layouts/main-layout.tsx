import { cn } from "@/lib/utils"
import { useStore } from "@/store/use-store";
import { useSidebarToggle } from "@/store/sidebar-store";
import { Navbar } from "./core/navbar";
import { Sidebar } from "./core/sidebar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {

    const sidebar = useStore(useSidebarToggle, (state) => state);

    if (!sidebar) return null;

    return (
        <>
        <Sidebar />
        <main
            className={cn(
                "min-h-[calc(100vh)] bg-primary-foreground transition-[margin-left] ease-in-out duration-300",
                sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
            )}
        >
            <div>
                <Navbar/>
                <div className="py-4 px-2 sm:px-4">
                    <div className="bg-white dark:bg-background py-4 px-4 sm:px-4 rounded-xl">
                        {children}
                    </div>
                </div>
            </div>
        </main>

    </>
    )
}
