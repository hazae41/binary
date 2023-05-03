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
  trySize(): Result<number, Error>

  /**
   * Write bytes to a cursor
   * @param cursor 
   */
  tryWrite(cursor: Cursor): Result<void, Error>

}

export class BinaryWriteUnderflowError extends Error {
  readonly #class = BinaryWriteUnderflowError

  constructor(
    readonly cursor: Cursor
  ) {
    super(`Binary write got ${cursor.remaining} remaining bytes`)
  }
}

export namespace Writable {

  /**
   * Write a binary data type to bytes
   * @param writable 
   * @returns 
   */
  export function tryWriteToBytes(writable: Writable): Result<Bytes, Error | BinaryWriteUnderflowError> {
    const size = writable.trySize()

    if (size.isErr())
      return size

    const cursor = Cursor.allocUnsafe(size.inner)
    const result = writable.tryWrite(cursor)

    if (result.isErr())
      return result

    if (cursor.remaining)
      return new Err(new BinaryWriteUnderflowError(cursor))

    return new Ok(cursor.bytes)
  }

}