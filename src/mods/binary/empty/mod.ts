// deno-lint-ignore-file no-namespace no-unused-vars

import type { Cursor } from "@hazae41/cursor";

export class Empty {

  constructor() { }

  size(): 0 {
    return 0
  }

  write(cursor: Cursor) {
    return
  }

  clone(): this {
    return this
  }

}

export namespace Empty {

  export function read(cursor: Cursor): Empty {
    return new Empty()
  }

}