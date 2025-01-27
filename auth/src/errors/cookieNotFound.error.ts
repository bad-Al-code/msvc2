import { CustomError } from './custom.error';

export class CookieNotFoundError extends CustomError {
    statusCode = 500;

    constructor() {
        super('Cookie not found');
    }

    serializeErrors() {
        return [{ message: 'Cookie not found' }];
    }
}
