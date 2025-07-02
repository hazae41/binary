import { Cursor } from "@hazae41/cursor";
import { Lengthed } from "@hazae41/lengthed";
import { Readable } from "mods/binary/readable/index.js";
import { Writable } from "../writable/index.js";

export class Opaque<N extends number = number> {

  constructor(
    readonly bytes: Uint8Array & Lengthed<N>
  ) { }

  cloneOrThrow() {
    return new Opaque(new Uint8Array(this.bytes) as Uint8Array & Lengthed<N>)
  }

  sizeOrThrow() {
    return this.bytes.length
  }

  writeOrThrow(cursor: Cursor) {
    cursor.writeOrThrow(this.bytes)
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