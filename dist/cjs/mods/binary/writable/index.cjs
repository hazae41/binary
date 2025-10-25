'use strict';

var index = require('./errors/index.cjs');
var cursor = require('@hazae41/cursor');

exports.Writable = void 0;
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
        const cursor$1 = new cursor.Cursor(bytes);
        writable.writeOrThrow(cursor$1);
        if (cursor$1.remaining)
            throw index.WriteUnderflowError.from(cursor$1);
        return bytes;
    }
    Writable.writeToBytesOrThrow = writeToBytesOrThrow;
})(exports.Writable || (exports.Writable = {}));

exports.SizeUnknownError = index.SizeUnknownError;
exports.WriteUnderflowError = index.WriteUnderflowError;
exports.WriteUnknownError = index.WriteUnknownError;
//# sourceMappingURL=index.cjs.map
