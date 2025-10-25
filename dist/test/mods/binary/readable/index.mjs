import { ReadUnderflowError } from './errors/index.mjs';
import { Cursor } from '@hazae41/cursor';

var Readable;
(function (Readable) {
    /**
     * Call readOrThrow() but rollback the cursor on error
     * @throws whatever readOrThrow() throws
     * @param readable
     * @param cursor
     * @returns
     */
    function readOrRollbackAndThrow(readable, cursor) {
        const offset = cursor.offset;
        try {
            return readable.readOrThrow(cursor);
        }
        catch (e) {
            cursor.offset = offset;
            throw e;
        }
    }
    Readable.readOrRollbackAndThrow = readOrRollbackAndThrow;
    /**
     * Call readOrThrow() on the given bytes and check for underflow
     * @param readable
     * @param bytes
     * @returns
     */
    function readFromBytesOrNull(readable, bytes) {
        try {
            const cursor = new Cursor(bytes);
            const output = readable.readOrThrow(cursor);
            if (cursor.remaining)
                return undefined;
            return output;
        }
        catch (e) {
            return undefined;
        }
    }
    Readable.readFromBytesOrNull = readFromBytesOrNull;
    /**
     * Call readOrThrow() on the given bytes and check for underflow
     * @throws whatever readOrThrow() throws
     * @throws ReadUnderflowError on underflow
     * @param readable
     * @param bytes
     * @returns
     */
    function readFromBytesOrThrow(readable, bytes) {
        const cursor = new Cursor(bytes);
        const output = readable.readOrThrow(cursor);
        if (cursor.remaining)
            throw ReadUnderflowError.from(cursor);
        return output;
    }
    Readable.readFromBytesOrThrow = readFromBytesOrThrow;
})(Readable || (Readable = {}));

export { ReadUnderflowError, Readable };
//# sourceMappingURL=index.mjs.map
