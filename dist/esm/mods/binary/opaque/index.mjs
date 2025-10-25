import { Readable } from '../readable/index.mjs';
import { Writable } from '../writable/index.mjs';

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
        return Readable.readFromBytesOrThrow(readable, this.bytes);
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
        return new Opaque(Writable.writeToBytesOrThrow(writable));
    }
    Opaque.writeFromOrThrow = writeFromOrThrow;
})(Opaque || (Opaque = {}));

export { Opaque };
//# sourceMappingURL=index.mjs.map
