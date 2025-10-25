class SizeUnknownError extends Error {
    #class = SizeUnknownError;
    name = this.#class.name;
    constructor(options) {
        super(`Could not size`, options);
    }
    static from(cause) {
        return new SizeUnknownError({ cause });
    }
}
class WriteUnknownError extends Error {
    #class = WriteUnderflowError;
    name = this.#class.name;
    constructor(options) {
        super(`Could not write`, options);
    }
    static from(cause) {
        return new WriteUnknownError({ cause });
    }
}
class WriteUnderflowError extends Error {
    cursorOffset;
    cursorLength;
    #class = WriteUnderflowError;
    name = this.#class.name;
    constructor(cursorOffset, cursorLength) {
        super(`Cursor has ${cursorLength - cursorOffset} remaining bytes after write`);
        this.cursorOffset = cursorOffset;
        this.cursorLength = cursorLength;
    }
    static from(cursor) {
        return new WriteUnderflowError(cursor.offset, cursor.length);
    }
}

export { SizeUnknownError, WriteUnderflowError, WriteUnknownError };
//# sourceMappingURL=index.mjs.map
