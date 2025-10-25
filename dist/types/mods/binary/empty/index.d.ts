import { Cursor } from '@hazae41/cursor';

declare class Empty {
    constructor();
    sizeOrThrow(): number;
    writeOrThrow(cursor: Cursor): void;
    cloneOrThrow(): this;
}
declare namespace Empty {
    function readOrThrow(cursor: Cursor): Empty;
}

export { Empty };
