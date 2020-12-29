import { Request, Response, NextFunction } from 'express';

import { CustomError } from '../errors/custom-error';

const middleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof CustomError) {
        return handleCustomError(error, res);
    }

    console.log(error);
    const { message } = error;
    res.status(500).send([{
        message
    }]);
};

const handleCustomError = (error: CustomError, res: Response) => {
    const reasons = error.getReasons();
    res.status(error.status).send(reasons);
};

export { middleware as errorHandler };