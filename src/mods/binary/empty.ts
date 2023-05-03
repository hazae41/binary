import { Cursor } from "@hazae41/cursor";
import { Ok, Result } from "@hazae41/result";

export class Empty {

  /**
   * An empty BDT
   */
  constructor() { }

  tryPrepare(): Result<this, never> {
    return new Ok(this)
  }

  trySize(): Result<number, never> {
    return new Ok(0)
  }

  tryWrite(cursor: Cursor): Result<void, never> {
    return Ok.void()
  }

  static tryRead(cursor: Cursor): Result<Empty, never> {
    return new Ok(new Empty())
  }

}