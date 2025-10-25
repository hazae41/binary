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

export { WriteUnderflowError };
//# sourceMappingURL=index.mjs.map
