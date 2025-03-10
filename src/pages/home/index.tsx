import { CardHome } from "./partials/card-home"

export const Home = () => {
    return (
        <div className="space-y-5">
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-center">
                <CardHome />
                <CardHome />
                <CardHome />
                <CardHome />
            </section>
        </div>
    )
}
