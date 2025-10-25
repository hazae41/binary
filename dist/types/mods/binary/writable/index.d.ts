import { Cursor } from '@hazae41/cursor';

/**
 * A writable binary data type
 */
interface Writable {
    /**
     * Compute the amount of bytes to allocate
     */
    sizeOrThrow(): number;
    /**
     * Write to a cursor
     * @param cursor
     */
    writeOrThrow(cursor: Cursor): void;
}
declare namespace Writable {
    /**
     * Call writeOrThrow() on sizeOrThrow()-sized bytes and check for underflow
     * @throws whatever sizeOrThrow() or writeOrThrow() throws
     * @param writable
     * @returns
     */
    function writeToBytesOrThrow(writable: Writable): Uint8Array<ArrayBuffer>;
}

export { Writable };
