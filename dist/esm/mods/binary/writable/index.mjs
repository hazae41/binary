import { WriteUnderflowError } from './errors/index.mjs';
export { SizeUnknownError, WriteUnknownError } from './errors/index.mjs';
import { Cursor } from '@hazae41/cursor';

var Writable;
(function (Writable) {
    /**
     * Call writeOrThrow() on sizeOrThrow()-sized bytes and check for underflow
     * @throws whatever sizeOrThrow() or writeOrThrow() throws
     * @param writable
     * @returns
     */
    function writeToBytesOrThrow(writable) {
        const size = writable.sizeOrThrow();
        const bytes = new Uint8Array(size);
        const cursor = new Cursor(bytes);
        writable.writeOrThrow(cursor);
        if (cursor.remaining)
            throw WriteUnderflowError.from(cursor);
        return bytes;
    }
    Writable.writeToBytesOrThrow = writeToBytesOrThrow;
})(Writable || (Writable = {}));

export { Writable, WriteUnderflowError };
//# sourceMappingURL=index.mjs.map
