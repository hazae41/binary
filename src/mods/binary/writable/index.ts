export * from "./errors/index.js"

import { Cursor } from "@hazae41/cursor"
import { WriteUnderflowError } from "./errors/index.js"

/**
 * A writable binary data type
 */
export interface Writable {

  /**
   * Compute the amount of bytes to allocate
   */
  sizeOrThrow(): number

  /**
   * Write to a cursor
   * @param cursor 
   */
  writeOrThrow(cursor: Cursor): void

}

export namespace Writable {

  /**
   * Call writeOrThrow() on sizeOrThrow()-sized bytes and check for underflow
   * @throws whatever sizeOrThrow() or writeOrThrow() throws
   * @param writable 
   * @returns 
   */
  export function writeToBytesOrThrow(writable: Writable) {
    const size = writable.sizeOrThrow()

    const bytes = new Uint8Array(size)
    const cursor = new Cursor(bytes)

    writable.writeOrThrow(cursor)

    if (cursor.remaining)
      throw WriteUnderflowError.from(cursor)

    return bytes
  }

}