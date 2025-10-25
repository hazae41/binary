import { Cursor } from '@hazae41/cursor';

type ReadError = ReadUnderflowError | ReadUnknownError;
declare class ReadUnknownError extends Error {
    #private;
    readonly name: string;
    constructor(options: ErrorOptions);
    static from(cause: unknown): ReadUnknownError;
}
declare class ReadUnderflowError extends Error {
    #private;
    readonly cursorOffset: number;
    readonly cursorLength: number;
    readonly name: string;
    constructor(cursorOffset: number, cursorLength: number);
    static from(cursor: Cursor): ReadUnderflowError;
}

export { ReadUnderflowError, ReadUnknownError };
export type { ReadError };
