import { Cursor } from "mods/cursor/cursor.js";

/**
 * A binary data type reader
 */
export interface Readable<T> {

  /**
   * Read bytes from a cursor
   * @param cursor 
   */
  read(cursor: Cursor): T

}

export namespace Readable {

  /**
   * Try to read a binary data type from a cursor
   * - on success: return the binary data type
   * - on error: rollback the offset and return undefined
   * @param readable 
   * @param cursor 
   * @returns 
   */
  export function tryRead<T>(readable: Readable<T>, cursor: Cursor) {
    const offset = cursor.offset

    try {
      return readable.read(cursor)
    } catch (e: unknown) {
      cursor.offset = offset
    }
  }

  /**
   * Read a binary data type from bytes
   * @param readable 
   * @param bytes 
   * @returns 
   */
  export function fromBytes<T>(readable: Readable<T>, bytes: Uint8Array) {
    const cursor = new Cursor(bytes)
    const result = readable.read(cursor)

    if (cursor.remaining)
      throw new Error(`Readable.fromBytes got ${cursor.remaining} remaining bytes`)
    return result
  }

  /**
   * Try to read a binary data type from bytes
   * - on success: return the binary data type
   * - on error: rollback the offset and return undefined
   * @param readable 
   * @param bytes 
   * @returns 
   */
  export function tryFromBytes<T>(readable: Readable<T>, bytes: Uint8Array) {
    const cursor = new Cursor(bytes)
    const result = tryRead(readable, cursor)

    if (result !== undefined && cursor.remaining)
      throw new Error(`Readable.tryFromBytes got ${cursor.remaining} remaining bytes`)
    return result
  }

}