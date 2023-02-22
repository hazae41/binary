import { Cursor } from "mods/cursor/cursor.js";

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