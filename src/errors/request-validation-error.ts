import { response } from 'express';
import { ValidationError } from 'express-validator';

import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
    status = 400;

    constructor(private errors: ValidationError[]) {
        super();

        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    getReasons() {
        return this.errors.map(error => {
            return { 
                message: error.msg,
                field: error.param
            }
        });
    }
};