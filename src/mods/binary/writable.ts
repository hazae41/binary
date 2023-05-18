import { Bytes } from "@hazae41/bytes"
import { Cursor } from "@hazae41/cursor"
import { Err, Ok, Result } from "@hazae41/result"
import { CursorWriteLenghtUnderflowError } from "./errors.js"

/**
 * A writable binary data type
 */
export interface Writable<SizeError = unknown, WriteError = unknown> {

  /**
   * Compute the amount of bytes to allocate
   */
  trySize(): Result<number, Writable.SizeError<this>>

  /**
   * Write to a cursor
   * @param cursor 
   */
  tryWrite(cursor: Cursor): Result<void, Writable.WriteError<this>>

}

export namespace Writable {

  export type SizeError<T extends Writable> = T extends Writable<infer SizeError, unknown> ? SizeError : never

  export type WriteError<T extends Writable> = T extends Writable<unknown, infer WriteError> ? WriteError : never

  /**
   * Write to bytes and check for underflow
   * 
   * Underflow is when the cursor has remaining bytes; meaning we have written less bytes than allocated
   * @param writable 
   * @returns 
   */
  export function tryWriteToBytes<T extends Writable>(writable: T): Result<Bytes, SizeError<T> | WriteError<T> | CursorWriteLenghtUnderflowError> {
    const size = writable.trySize()

    if (size.isErr())
      return size

    const cursor = Cursor.allocUnsafe(size.inner)
    const result = writable.tryWrite(cursor)

    if (result.isErr())
      return result

    if (cursor.remaining)
      return new Err(new CursorWriteLenghtUnderflowError(cursor))

    return new Ok(cursor.bytes)
  }

}