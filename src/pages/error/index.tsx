import { Button } from "@/components/ui/button";
import { route } from "@/routes";
import { Car } from "lucide-react";
import { Link } from "react-router-dom";

export const Error = () => {
    return (
        <section className="py-20 bg-white w-full min-h-screen text-black">
            <div className="container mx-auto">
                <div className="flex justify-center items-center">
                    <div className="text-center w-full">
                        <div
                            className="bg-center bg-no-repeat h-[500px] w-full"
                            style={{ backgroundImage: "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)" }}
                        >
                            <h1 className="text-4xl font-bold">404 | Not Found</h1>
                        </div>
                        <div className="mt-[-50px]">
                            <div className="flex  items-center justify-center">
                                <Car  height={80} width={80}/>
                            </div>
                            <h3 className="text-2xl font-semibold">
                                Parece que estás perdido
                            </h3>
                            <p className="text-gray-600 pb-5">¡La página que estás buscando no está disponible!</p>
                            <Link to={route.home}>
                                <Button>
                                    Volver al panel
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
