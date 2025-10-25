import * as _hazae41_lengthed from '@hazae41/lengthed';
import { Cursor } from '@hazae41/cursor';
import { Readable } from '../readable/index.js';
import { Writable } from '../writable/index.js';

declare class Opaque<T extends Uint8Array = Uint8Array> {
    readonly bytes: T;
    constructor(bytes: T);
    sizeOrThrow(): number;
    writeOrThrow(cursor: Cursor): void;
    cloneOrThrow(): Opaque<Uint8Array<ArrayBuffer>>;
    readIntoOrThrow<R extends Readable.Infer<R>>(readable: R): Readable.Output<R>;
}
declare namespace Opaque {
    function readOrThrow(cursor: Cursor): Opaque<Uint8Array<ArrayBufferLike> & _hazae41_lengthed.Lengthed<number>>;
    function writeFromOrThrow(writable: Writable): Opaque;
}

export { Opaque };
