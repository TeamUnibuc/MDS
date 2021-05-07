import { Request, Response, NextFunction } from 'express';

// Looks at auth state of passport and decides if user is shallow or not
// Sets req.appUser as a UsersDoc object
// Sets req.isAppUserAuthenticated(): bool

export const appAuthMiddleware = (req: Request, _res: Response, next: NextFunction): void =>
{
    req.isAppUserAuthenticated = () => isAppUserAuthenticated(req) === true;
    next()
}

const isAppUserAuthenticated = (req: Request): boolean =>
{
    if (req.isAuthenticated()) {
        if (req.user.Username) 
            return true
    }
    return false
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {

        interface Request {
            isAppUserAuthenticated(): this is AuthenticatedRequest;
        }
    }
}
