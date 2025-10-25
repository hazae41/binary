import { Cursor } from '@hazae41/cursor';

/**
 * A readable binary data type
 */
interface Readable<Output = unknown> {
    /**
     * Read from a cursor
     * @param cursor
     */
    readOrThrow(cursor: Cursor): Output;
}
declare namespace Readable {
    type Infer<T extends Readable> = Readable<Readable.Output<T>>;
    type Output<T extends Readable> = T extends Readable<infer O> ? O : never;
    /**
     * Call readOrThrow() but rollback the cursor on error
     * @throws whatever readOrThrow() throws
     * @param readable
     * @param cursor
     * @returns
     */
    function readOrRollbackAndThrow<T extends Infer<T>>(readable: T, cursor: Cursor): Output<T>;
    /**
     * Call readOrThrow() on the given bytes and check for underflow
     * @param readable
     * @param bytes
     * @returns
     */
    function readFromBytesOrNull<T extends Infer<T>>(readable: T, bytes: Uint8Array): Output<T> | undefined;
    /**
     * Call readOrThrow() on the given bytes and check for underflow
     * @throws whatever readOrThrow() throws
     * @throws ReadUnderflowError on underflow
     * @param readable
     * @param bytes
     * @returns
     */
    function readFromBytesOrThrow<T extends Infer<T>>(readable: T, bytes: Uint8Array): Output<T>;
}

export { Readable };
