import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
    status = 400;
    public message: string;

    constructor(message: string) {
        super();
        
        this.message = message;

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    getReasons() {
        return [
            { message: this.message }
        ];
    }
};