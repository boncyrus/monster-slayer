export const routeConfig = {
    login: {
        path: '/accounts/login',
        name: 'login',
    },
    signup: {
        path: '/accounts/create',
        name: 'signup',
    },
    battleField: {
        path: '/battle-field',
        name: 'battle-field',
    },
    character: {
        index: {
            path: '/character',
            name: 'character'
        },
        inventory: {
            path: '/character/inventory',
            name: 'inventory'
        }
    }
}