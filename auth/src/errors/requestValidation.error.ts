import { ValidationError } from 'express-validator';
import { CustomError } from './custom.error';

export class RequestValidationError extends CustomError {
    statusCode: number = 400;
    constructor(public errors: ValidationError[]) {
        super('Invalid request parameters');
    }

    serializeErrors(): { message: string }[] {
        return this.errors.map((err) => {
            return { message: err.msg };
        });
    }
}
