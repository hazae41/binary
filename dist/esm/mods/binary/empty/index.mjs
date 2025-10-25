class Empty {
    constructor() { }
    sizeOrThrow() {
        return 0;
    }
    writeOrThrow(cursor) {
        return;
    }
    cloneOrThrow() {
        return this;
    }
}
(function (Empty) {
    function readOrThrow(cursor) {
        return new Empty();
    }
    Empty.readOrThrow = readOrThrow;
})(Empty || (Empty = {}));

export { Empty };
//# sourceMappingURL=index.mjs.map
