import { CustomError } from './custom.error';

export class NotFoundError extends CustomError {
    statusCode: number = 404;

    constructor() {
        super('Route not found');
    }

    serializeErrors(): { message: string }[] {
        return [{ message: 'Not Found' }];
    }
}
