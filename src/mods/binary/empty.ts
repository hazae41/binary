import { Cursor } from "mods/cursor/cursor.js";

export class Empty {

  static size() {
    return 0
  }

  static write(cursor: Cursor) {
    /**
     * NOOP 
     */
  }

  static read(cursor: Cursor) {
    return this
  }

}