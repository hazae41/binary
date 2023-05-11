import { Cursor } from "@hazae41/cursor"
import { Err, Ok, Result } from "@hazae41/result"

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

export class BinaryWriteUnderflowError extends Error {
  readonly #class = BinaryWriteUnderflowError

  constructor(
    readonly cursor: Cursor
  ) {
    super(`Cursor has ${cursor.remaining} remaining bytes after write`)
  }
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
  export function tryWriteToBytes<T extends Writable>(writable: T) {
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