// deno-lint-ignore-file no-namespace

import type { Cursor } from "@hazae41/cursor";

export class Unknown<T extends ArrayBufferLike = ArrayBufferLike> {

  constructor(
    readonly bytes: Uint8Array<T>
  ) { }

  size(): number {
    return this.bytes.length
  }

  write(cursor: Cursor) {
    cursor.write(this.bytes)
  }

  clone(): Unknown<ArrayBuffer> {
    return new Unknown(new Uint8Array(this.bytes))
  }

}

export namespace Unknown {

  export function read<T extends ArrayBufferLike>(cursor: Cursor<T>): Unknown<T> {
    return new Unknown(cursor.read(cursor.remaining))
  }

}