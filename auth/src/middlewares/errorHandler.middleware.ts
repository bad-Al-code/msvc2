import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import { CustomError } from '../errors/custom.error';

export const errorHandler: ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).send({ errors: err.serializeErrors() });
        return;
    }

    res.status(400).send({ errors: [{ message: 'Something went wrong' }] });
};
