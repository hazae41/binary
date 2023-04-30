import { Bytes } from "@hazae41/bytes"
import { Cursor } from "@hazae41/cursor"
import { Err, Ok, Result } from "@hazae41/result"

/**
 * A writable binary data type
 */
export interface Writable {

  /**
   * Get the amount of bytes
   */
  size(): number

  /**
   * Write bytes to a cursor
   * @param cursor 
   */
  write(cursor: Cursor): Result<void, Error>

}

export namespace Writable {

  /**
   * Write a binary data type to bytes
   * @param writable 
   * @returns 
   */
  export function toBytes(writable: Writable): Result<Bytes, Error> {
    const cursor = Cursor.allocUnsafe(writable.size())
    const result = writable.write(cursor)

    if (result.isErr())
      return result
    if (cursor.remaining)
      return Err.error(`Writable.toBytes got ${cursor.remaining} remaining bytes`)
    return new Ok(cursor.bytes)
  }

}