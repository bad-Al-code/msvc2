import { CustomError } from './custom.error';

export class BadRequestError extends CustomError {
    statusCode: number = 400;

    constructor(public message: string) {
        super(message);
    }

    serializeErrors(): { message: string }[] {
        return [{ message: this.message }];
    }
}
