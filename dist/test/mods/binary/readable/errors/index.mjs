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

export { ReadUnderflowError };
//# sourceMappingURL=index.mjs.map
