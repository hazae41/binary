'use strict';

var index = require('./errors/index.cjs');
var cursor = require('@hazae41/cursor');

exports.Readable = void 0;
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
            const cursor$1 = new cursor.Cursor(bytes);
            const output = readable.readOrThrow(cursor$1);
            if (cursor$1.remaining)
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
        const cursor$1 = new cursor.Cursor(bytes);
        const output = readable.readOrThrow(cursor$1);
        if (cursor$1.remaining)
            throw index.ReadUnderflowError.from(cursor$1);
        return output;
    }
    Readable.readFromBytesOrThrow = readFromBytesOrThrow;
})(exports.Readable || (exports.Readable = {}));

exports.ReadUnderflowError = index.ReadUnderflowError;
exports.ReadUnknownError = index.ReadUnknownError;
//# sourceMappingURL=index.cjs.map
