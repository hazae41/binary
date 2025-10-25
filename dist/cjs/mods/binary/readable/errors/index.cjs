'use strict';

class ReadUnknownError extends Error {
    #class = ReadUnknownError;
    name = this.#class.name;
    constructor(options) {
        super(`Could not read`, options);
    }
    static from(cause) {
        return new ReadUnknownError({ cause });
    }
}
class ReadUnderflowError extends Error {
    cursorOffset;
    cursorLength;
    #class = ReadUnderflowError;
    name = this.#class.name;
    constructor(cursorOffset, cursorLength) {
        super(`Cursor has ${cursorLength - cursorOffset} remaining bytes after read`);
        this.cursorOffset = cursorOffset;
        this.cursorLength = cursorLength;
    }
    static from(cursor) {
        return new ReadUnderflowError(cursor.offset, cursor.length);
    }
}

exports.ReadUnderflowError = ReadUnderflowError;
exports.ReadUnknownError = ReadUnknownError;
//# sourceMappingURL=index.cjs.map
