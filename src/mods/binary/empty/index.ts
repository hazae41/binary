import type { Cursor } from "@hazae41/cursor";

export class Empty {

  constructor() { }

  sizeOrThrow() {
    return 0
  }

  // deno-lint-ignore no-unused-vars
  writeOrThrow(cursor: Cursor) {
    return
  }

  cloneOrThrow() {
    return this
  }

}

export namespace Empty {

  export function readOrThrow(cursor: Cursor) {
    return new Empty()
  }

}