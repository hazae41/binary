import { Cursor } from "@hazae41/cursor";
import { Readable } from "mods/binary/readable/index.js";
import { Writable } from "../writable/index.js";

export class Opaque<T extends Uint8Array = Uint8Array> {

  constructor(
    readonly bytes: T
  ) { }

  sizeOrThrow() {
    return this.bytes.length
  }

  writeOrThrow(cursor: Cursor) {
    cursor.writeOrThrow(this.bytes)
  }

  cloneOrThrow() {
    return new Opaque(new Uint8Array(this.bytes))
  }

  readIntoOrThrow<R extends Readable.Infer<R>>(readable: R): Readable.Output<R> {
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