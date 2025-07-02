import { Slice } from "@hazae41/clonable";
import { Cursor } from "@hazae41/cursor";
import { Readable } from "mods/binary/readable/index.js";
import { Writable } from "../writable/index.js";

export class Opaque<N extends number = number> {

  constructor(
    readonly slice: Slice<N>
  ) { }

  get bytes() {
    return this.slice.bytes
  }

  cloneOrThrow() {
    return new Opaque(this.slice.cloneOrThrow())
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

    const bytes = Writable.writeToBytesOrThrow(writable)
    const slice = new Slice(bytes)

    return new Opaque(slice)
  }

}