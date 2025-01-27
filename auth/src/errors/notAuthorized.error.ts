import { CustomError } from './custom.error';

export class NotAuthorizedError extends CustomError {
    statusCode: number = 401;

    constructor() {
        super('Not Authorized');
    }

    serializeErrors(): { message: string }[] {
        return [{ message: 'Not Authorized' }];
    }
}
