import { Card } from "@/components/ui/card"
import { DollarSign } from "lucide-react"


export const CardHome = () => {
    return (
        <Card>
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">
                    Total Revenue
                </h3>
                <DollarSign />
            </div>
            <div className="p-6 pt-0">
                <p className="text-2xl font-bold">
                    $45,231.89
                </p>
                <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                </p>
            </div>
        </Card>
    )
}
