import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, MapPin } from "lucide-react"
import { UseAuth } from "@/context/auth-context"

export const Account = () => {

    const { user } = UseAuth()

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <Card className="shadow-md">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6">
                    <div className="flex items-center gap-6">
                        <Avatar className="h-20 w-20 border-4 border-white">
                            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Avatar" />
                            <AvatarFallback className="bg-blue-700 text-xl">x</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-2xl font-bold">Información del perfil</h2>
                            <p className="text-blue-100">Gestiona tu información personal</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-sm font-medium">
                                Nombre del usuario
                            </Label>
                            <div className="flex items-center border rounded-md overflow-hidden">
                                <div className="bg-blue-50 p-3 border-r">
                                    <User className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input id="username" defaultValue={user?.username} readOnly className="border-0 focus-visible:ring-0" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location" className="text-sm font-medium">
                                Ubicación
                            </Label>
                            <div className="flex items-center border rounded-md overflow-hidden">
                                <div className="bg-blue-50 p-3 border-r">
                                    <MapPin className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input id="location" placeholder="Lima, Peru" readOnly className="border-0 focus-visible:ring-0" />
                            </div>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}
