import { Cursor } from "@hazae41/cursor";
import { Ok, Result } from "@hazae41/result";

export class Empty {

  /**
   * An empty BDT
   */
  constructor() { }

  prepare(): Result<this, never> {
    return new Ok(this)
  }

  size() {
    return 0
  }

  write(cursor: Cursor): Result<void, never> {
    return new Ok<void>(undefined)
  }

  static read(cursor: Cursor): Result<Empty, never> {
    return new Ok(new this())
  }

}