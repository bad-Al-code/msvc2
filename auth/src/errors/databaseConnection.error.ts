import { CustomError } from './custom.error';

export class DatabaseConnectionError extends CustomError {
    statusCode: number = 500;
    reason = 'Error connection to database';

    constructor() {
        super('Error connecting to db');
    }

    serializeErrors(): { message: string }[] {
        return [{ message: this.reason }];
    }
}
