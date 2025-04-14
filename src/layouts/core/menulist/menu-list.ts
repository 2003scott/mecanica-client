import { Settings, SquarePen, LayoutGrid, BookUser } from 'lucide-react';
import { Group } from './menu';
import { route } from '@/routes';

export function getMenuList(pathname: string): Group[] {
    return [
        {
            groupLabel: '',
            menus: [
                {
                    href: route.home,
                    label: 'Dashboard',
                    active: pathname.includes(route.home),
                    icon: LayoutGrid,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: 'Contenido',
            menus: [
                {
                    href: '',
                    label: 'Vehiculos',
                    active: pathname.includes(route.vehicles),
                    icon: SquarePen,
                    submenus: [
                        {
                            href: route.vehicles,
                            label: 'Lista de Vehiculos',
                            active: pathname === route.vehicles
                        },
                        {
                            href: route.create,
                            label: 'Nuevo Vehiculo',
                            active: pathname === route.create
                        }
                    ]
                },
                {
                    href: '',
                    label: 'Propietarios',
                    active: pathname.includes(route.owners),
                    icon: BookUser,
                    submenus: [
                        {
                            href: route.owners,
                            label: 'Lista de Propietarios',
                            active: pathname === route.owners
                        },
                        {
                            href: route.ownersCreate,
                            label: 'Nuevo Propietario',
                            active: pathname === route.ownersCreate
                        }
                    ]
                },
            ]
        },
        {
            groupLabel: 'Configuración',
            menus: [
                {
                    href: route.account,
                    label: 'Perfil',
                    active: pathname.includes(route.account),
                    icon: Settings,
                    submenus: []
                }
            ]
        }
    ];
}
