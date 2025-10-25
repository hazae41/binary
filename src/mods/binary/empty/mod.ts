import type { Cursor } from "@hazae41/cursor";

export class Empty {

  constructor() { }

  sizeOrThrow(): 0 {
    return 0
  }

  // deno-lint-ignore no-unused-vars
  writeOrThrow(cursor: Cursor) {
    return
  }

  cloneOrThrow(): this {
    return this
  }

}

export namespace Empty {

  export function readOrThrow(cursor: Cursor): Empty {
    return new Empty()
  }

}