export const routeConfig = {
    login: {
        path: '/accounts/login',
        name: 'login',
    },
    signup: {
        path: '/accounts/create',
        name: 'signup',
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
    },
    dungeons: {
        index: {
            path: '/dungeons',
            name: 'dungeons'
        },
        battle: {
            path: '/dungeons/:id',
            name: 'dungeon-battle'
        }
    }
}