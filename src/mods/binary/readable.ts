import { Cursor } from "@hazae41/cursor";
import { Err, Result } from "@hazae41/result";

/**
 * A readable binary data type
 */
export interface Readable<T> {

  /**
   * Read bytes from a cursor
   * @param cursor 
   */
  tryRead(cursor: Cursor): Result<T, Error>

}

export namespace Readable {

  /**
   * Try to read a binary data type from a cursor
   * - on Ok: returns the Ok containing the BDT
   * - on Err: rollback the offset, and returns the Err
   * @param readable 
   * @param cursor 
   * @returns 
   */
  export function tryReadOrRollback<T>(readable: Readable<T>, cursor: Cursor): Result<T, Error> {
    const offset = cursor.offset
    const result = readable.tryRead(cursor)

    if (result.isErr())
      cursor.offset = offset

    return result
  }

  /**
   * Read a binary data type from bytes
   * @param readable 
   * @param bytes 
   * @returns 
   */
  export function tryReadFromBytes<T>(readable: Readable<T>, bytes: Uint8Array): Result<T, Error> {
    const cursor = new Cursor(bytes)
    const result = readable.tryRead(cursor)

    if (result.isErr())
      return result

    if (cursor.remaining)
      return Err.error(`Readable.fromBytes got ${cursor.remaining} remaining bytes`)

    return result
  }

}