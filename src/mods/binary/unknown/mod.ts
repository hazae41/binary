import { Readable } from "@/mods/binary/readable/mod.ts";
import { Writable } from "@/mods/binary/writable/mod.ts";
import type { Cursor } from "@hazae41/cursor";

export class Unknown<T extends Uint8Array = Uint8Array> {

  constructor(
    readonly bytes: T
  ) { }

  sizeOrThrow(): number {
    return this.bytes.length
  }

  writeOrThrow(cursor: Cursor) {
    cursor.writeOrThrow(this.bytes)
  }

  cloneOrThrow(): Unknown<Uint8Array<ArrayBuffer>> {
    return new Unknown(new Uint8Array(this.bytes))
  }

  readIntoOrThrow<T extends Readable.Infer<T>>(readable: T): Readable.Output<T> {
    return Readable.readFromBytesOrThrow(readable, this.bytes)
  }

}

export namespace Unknown {

  export function readOrThrow(cursor: Cursor): Unknown<Uint8Array> {
    return new Unknown(cursor.readOrThrow(cursor.remaining))
  }

  export function writeFromOrThrow(writable: Writable): Unknown {
    if (writable instanceof Unknown)
      return writable
    return new Unknown(Writable.writeToBytesOrThrow(writable))
  }

}