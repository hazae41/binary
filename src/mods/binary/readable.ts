import { Bytes } from "@hazae41/bytes";
import { Cursor, CursorReadError } from "@hazae41/cursor";
import { Err, Result } from "@hazae41/result";

export type BinaryReadError =
  | BinaryReadUnderflowError
  | CursorReadError

export class BinaryReadUnderflowError extends Error {
  readonly #class = BinaryReadUnderflowError

  constructor(
    readonly cursor: Cursor
  ) {
    super(`Cursor has ${cursor.remaining} remaining bytes after read`)
  }
}

/**
 * A readable binary data type
 */
export interface Readable<ReadOutput = unknown, ReadError = unknown> {

  /**
   * Read from a cursor
   * @param cursor 
   */
  tryRead(cursor: Cursor): Result<Readable.ReadOutput<this>, Readable.ReadError<this>>

}

export namespace Readable {

  export type ReadOutput<T extends Readable> = T extends Readable<infer ReadOutput, unknown> ? ReadOutput : never

  export type ReadError<T extends Readable> = T extends Readable<unknown, infer ReadError> ? ReadError : never

  /**
   * Try to read a binary data type from a cursor
   * - on Ok: returns the Ok containing the BDT
   * - on Err: rollback the offset, and returns the Err
   * @param readable 
   * @param cursor 
   * @returns 
   */
  export function tryReadOrRollback<T extends Readable>(readable: T, cursor: Cursor): Result<ReadOutput<T>, ReadError<T>> {
    const offset = cursor.offset
    const result = readable.tryRead(cursor)

    if (result.isErr())
      cursor.offset = offset

    return result
  }

  /**
   * Read from bytes and check for underflow
   * 
   * Underflow is when the cursor has remaining bytes; meaning we read less bytes than the expected length
   * @param readable 
   * @param bytes 
   * @returns 
   */
  export function tryReadFromBytes<T extends Readable>(readable: T, bytes: Bytes): Result<ReadOutput<T>, ReadError<T> | BinaryReadUnderflowError> {
    const cursor = new Cursor(bytes)
    const result = readable.tryRead(cursor)

    if (result.isErr())
      return result

    if (cursor.remaining)
      return new Err(new BinaryReadUnderflowError(cursor))

    return result
  }

}