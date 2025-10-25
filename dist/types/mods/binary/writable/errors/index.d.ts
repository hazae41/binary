import { Cursor } from '@hazae41/cursor';

type WriteError = SizeUnknownError | WriteUnderflowError | WriteUnknownError;
declare class SizeUnknownError extends Error {
    #private;
    readonly name: string;
    constructor(options: ErrorOptions);
    static from(cause: unknown): SizeUnknownError;
}
declare class WriteUnknownError extends Error {
    #private;
    readonly name: string;
    constructor(options: ErrorOptions);
    static from(cause: unknown): WriteUnknownError;
}
declare class WriteUnderflowError extends Error {
    #private;
    readonly cursorOffset: number;
    readonly cursorLength: number;
    readonly name: string;
    constructor(cursorOffset: number, cursorLength: number);
    static from(cursor: Cursor): WriteUnderflowError;
}

export { SizeUnknownError, WriteUnderflowError, WriteUnknownError };
export type { WriteError };
