import { Bytes } from "@hazae41/bytes"
import { Cursor } from "@hazae41/cursor"
import { Err, Ok, Result } from "@hazae41/result"
import { BinaryWriteError, CursorWriteLenghtUnderflowError } from "./errors.js"

/**
 * A writable binary data type
 */
export interface Writable<SizeError = unknown, WriteError = unknown> {

  /**
   * Compute the amount of bytes to allocate
   */
  trySize(): Result<number, SizeError>

  /**
   * Write to a cursor
   * @param cursor 
   */
  tryWrite(cursor: Cursor): Result<void, WriteError>

}

export namespace Writable {

  export type Infer<T extends Writable> = Writable<SizeError<T>, WriteError<T>>

  export type SizeError<T extends Writable> = T extends Writable<infer SizeError, unknown> ? SizeError : never

  export type WriteError<T extends Writable> = T extends Writable<unknown, infer WriteError> ? WriteError : never

  /**
   * Write to bytes and check for underflow
   * 
   * Underflow is when the cursor has remaining bytes; meaning we have written less bytes than allocated
   * @param writable 
   * @returns 
   */
  export function tryWriteToBytes<T extends Writable.Infer<T>>(writable: T): Result<Bytes, SizeError<T> | WriteError<T> | BinaryWriteError> {
    return Result.unthrowSync(t => {
      const size = writable.trySize().throw(t)
      const bytes = Bytes.tryAllocUnsafe(size).throw(t)

      const cursor = new Cursor(bytes)
      writable.tryWrite(cursor).throw(t)

      if (cursor.remaining)
        return new Err(CursorWriteLenghtUnderflowError.from(cursor))

      return new Ok(cursor.bytes)
    })
  }

}