import { Cursor } from "mods/cursor/cursor.js"

/**
 * A binary data type writer
 */
export interface Writable {

  /**
   * Prepare this writable
   */
  prepare?(): void

  /**
   * Get the amount of bytes
   */
  size(): number

  /**
   * Write bytes to a cursor
   * @param cursor 
   */
  write(cursor: Cursor): void

}

export namespace Writable {

  /**
   * Write a binary data type to bytes
   * @param writable 
   * @returns 
   */
  export function toBytes(writable: Writable) {
    writable.prepare?.()
    const cursor = Cursor.allocUnsafe(writable.size())
    writable.write(cursor)

    if (cursor.remaining)
      throw new Error(`Writable.toBytes got ${cursor.remaining} remaining bytes`)
    return cursor.bytes
  }

}