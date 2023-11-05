import { Cursor } from "@hazae41/cursor";

export class Empty {

  constructor() { }

  sizeOrThrow() {
    return 0
  }

  writeOrThrow(cursor: Cursor) {
    return
  }

  static readOrThrow(cursor: Cursor) {
    return new Empty()
  }

}