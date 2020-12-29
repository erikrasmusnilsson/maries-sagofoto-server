export interface ErrorReason {
    message: string;
    field?: string;
};

export abstract class CustomError extends Error {
    abstract status: number;

    constructor() {
        super();
    }

    abstract getReasons(): ErrorReason[];
};