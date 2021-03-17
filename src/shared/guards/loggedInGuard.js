import { routeConfig } from '../../models/routeConfig';

export function loggedInGuard(to, from, next) {
    const isAuthenticated = !!localStorage.getItem('accountId');
    if (to.name === routeConfig.login.name || to.name === routeConfig.signup) {
        next()
    } else {
        if (isAuthenticated === true) {
            next();
        } else {
            next(routeConfig.login.path);
        }
    }
}