import { Button } from "@/components/ui/button"
import { route } from "@/routes"
import { Link } from "react-router-dom"

export const ErrorPage = ({ mensaje }: { mensaje: string }) => {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="max-w-2xl w-full flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="space-y-4">
                    <img src="/images/logo.avif" alt="logo" />
                    <div className="pl-4 space-y-4">
                        <article className="pb-4 space-y-1">
                            <p>Algo no salio bien :c</p>
                            <p>Si crees que este es un error contacta a soporte.</p>
                        </article>
                        <Link to={route.home}>
                            <Button>
                                Volver al Panel
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="relative">
                    <h2 className="text-2xl font-normal pb-4 text-center">{mensaje}</h2>
                    <img src="/images/erroricon.svg" alt="error" draggable="false" />
                </div>
            </div>
        </div>
    )
}
