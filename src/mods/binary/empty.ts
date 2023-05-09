import { Cursor } from "@hazae41/cursor";
import { Ok } from "@hazae41/result";

export class Empty {

  /**
   * An empty BDT
   */
  constructor() { }

  tryPrepare() {
    return new Ok(this)
  }

  trySize() {
    return new Ok(0)
  }

  tryWrite(cursor: Cursor) {
    return Ok.void()
  }

  static tryRead(cursor: Cursor) {
    return new Ok(new Empty())
  }

}