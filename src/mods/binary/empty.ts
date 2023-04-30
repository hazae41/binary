import { Cursor } from "@hazae41/cursor";

export class Empty {

  constructor() { }

  prepare() {
    return this
  }

  size() {
    return 0
  }

  write(cursor: Cursor) {
    /**
     * NOOP 
     */
  }

  static read(cursor: Cursor) {
    return new this()
  }

}