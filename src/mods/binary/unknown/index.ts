import { Readable } from "@/mods/binary/readable/index.ts";
import { Writable } from "@/mods/binary/writable/index.ts";
import type { Cursor } from "@hazae41/cursor";

export class Unknown<T extends Uint8Array = Uint8Array> {

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
    return new Unknown(new Uint8Array(this.bytes))
  }

  readIntoOrThrow<U>(readable: Readable<U>): U {
    return Readable.readFromBytesOrThrow(readable, this.bytes)
  }

}

export namespace Unknown {

  export function readOrThrow(cursor: Cursor) {
    return new Unknown(cursor.readOrThrow(cursor.remaining))
  }

  export function writeFromOrThrow(writable: Writable): Unknown {
    if (writable instanceof Unknown)
      return writable
    return new Unknown(Writable.writeToBytesOrThrow(writable))
  }

}