import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
import { Car, MenuIcon } from "lucide-react"
import { Link } from "wouter"
import { Menu } from "./menu"
import { route } from "@/routes"

export const SheetMenu = () => {
    return (
        <Sheet>
            <SheetTrigger className="lg:hidden" asChild>
                <Button className="h-8" variant="outline" size="icon">
                    <MenuIcon size={20} />
                </Button>
            </SheetTrigger>
            <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
                <SheetHeader>
                    <Button
                        className="flex justify-center items-center pb-2 pt-1"
                        variant="link"
                        asChild
                    >
                        <Link href={route.home} className="flex items-center gap-2">
                            <Car  height={80} width={80}/>
                        </Link>
                    </Button>
                </SheetHeader>
                <Menu isOpen />
            </SheetContent>
        </Sheet>
    )
}
