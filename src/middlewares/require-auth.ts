import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import jwt from 'jsonwebtoken';

export interface UserPayload {
    id: string;
    username: string;
}

declare module 'express' {
    export interface Request {
        user?: UserPayload;
    }
}

const middleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session?.jwt) throw new NotAuthorizedError();

    try {
        const payload = jwt.verify(
            req.session.jwt,
            process.env.JWT_KEY!
        ) as UserPayload;
        
        req.user = payload;

        next();
    } catch (error) {
        throw new NotAuthorizedError();
    }
};

export { middleware as requireAuth };