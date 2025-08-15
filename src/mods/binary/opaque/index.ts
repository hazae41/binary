import { Cursor } from "@hazae41/cursor";
import { Bytes } from "libs/bytes/index.js";
import { Readable } from "mods/binary/readable/index.js";
import { Writable } from "../writable/index.js";

export class Opaque<T extends ArrayBufferLike = ArrayBufferLike> {

  constructor(
    readonly bytes: Uint8Array<T>
  ) { }

  sizeOrThrow() {
    return this.bytes.length
  }

  writeOrThrow(cursor: Cursor) {
    cursor.writeOrThrow(this.bytes)
  }

  cloneOrThrow() {
    return new Opaque(Bytes.copy(this.bytes))
  }

  readIntoOrThrow<T extends Readable.Infer<T>>(readable: T): Readable.Output<T> {
    return Readable.readFromBytesOrThrow(readable, this.bytes)
  }

}

export namespace Opaque {

  export function readOrThrow(cursor: Cursor) {
    return new Opaque(cursor.readOrThrow(cursor.remaining))
  }

  export function writeFromOrThrow(writable: Writable): Opaque {
    if (writable instanceof Opaque)
      return writable
    return new Opaque(Writable.writeToBytesOrThrow(writable))
  }

}