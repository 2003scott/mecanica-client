import { Card } from "@/components/ui/card";
import { UseAuth } from "@/context/auth-context";


export const Account = () => {

    const { user } = UseAuth();

    return (
        <>
            <div className="bg-background relative rounded-lg  max-w-6xl mt-4 mx-auto overflow-hidden">
                <div className="relative h-[200px] lg:h-[350px]">
                <Card className="mt-5">
                    <div className="bg-primary overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-muted">Información del perfil</h3>
                        </div>
                        <div className="bg-background">
                            <dl>
                                <div className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium">Nombre del usuario</dt>
                                    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{user?.username}</dd>
                                </div>
                            </dl>

                        </div>
                    </div>
                </Card>
                </div>



            </div>
        </>
    )
}
