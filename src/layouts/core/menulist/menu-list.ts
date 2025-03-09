import { Settings, Bookmark, SquarePen, LayoutGrid } from 'lucide-react';
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
            groupLabel: 'Contents',
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
                            href: '/posts/new',
                            label: 'New Post',
                            active: pathname === '/posts/new'
                        }
                    ]
                },
                {
                    href: '/categories',
                    label: 'Categories',
                    active: pathname.includes('/categories'),
                    icon: Bookmark,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: 'Settings',
            menus: [
                {
                    href: '/account',
                    label: 'Account',
                    active: pathname.includes('/account'),
                    icon: Settings,
                    submenus: []
                }
            ]
        }
    ];
}
