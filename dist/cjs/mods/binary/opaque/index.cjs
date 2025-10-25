'use strict';

var index$1 = require('../readable/index.cjs');
var index = require('../writable/index.cjs');

class Opaque {
    bytes;
    constructor(bytes) {
        this.bytes = bytes;
    }
    sizeOrThrow() {
        return this.bytes.length;
    }
    writeOrThrow(cursor) {
        cursor.writeOrThrow(this.bytes);
    }
    cloneOrThrow() {
        return new Opaque(new Uint8Array(this.bytes));
    }
    readIntoOrThrow(readable) {
        return index$1.Readable.readFromBytesOrThrow(readable, this.bytes);
    }
}
(function (Opaque) {
    function readOrThrow(cursor) {
        return new Opaque(cursor.readOrThrow(cursor.remaining));
    }
    Opaque.readOrThrow = readOrThrow;
    function writeFromOrThrow(writable) {
        if (writable instanceof Opaque)
            return writable;
        return new Opaque(index.Writable.writeToBytesOrThrow(writable));
    }
    Opaque.writeFromOrThrow = writeFromOrThrow;
})(Opaque || (Opaque = {}));

exports.Opaque = Opaque;
//# sourceMappingURL=index.cjs.map
