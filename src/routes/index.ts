
export const route = {
    home: '/',
    login: '/login',
    crearCuenta: '/crearCuenta',
    /*vehicles*/
    vehicles : "/dashboard/vehicles",
    vehiclesEdit : "/dashboard/vehicles/edit/:id",
    owners : "/dashboard/owners",
    ownersEdit : "/dashboard/owners/edit/:id",
    ownersCreate : "/dashboard/owners/create",
    create : "/dashboard/vehicles/create",
    account: '/dashboard/account',
} as const

Object.freeze(route);
