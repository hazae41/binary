import { Cursor } from "@hazae41/cursor";
import { Err, Ok, Result } from "@hazae41/result";
import { BinaryReadError, CursorReadLengthUnderflowError } from "./errors.js";

/**
 * A readable binary data type
 */
export interface Readable<ReadOutput = unknown, ReadError = unknown> {

  /**
   * Read from a cursor
   * @param cursor 
   */
  tryRead(cursor: Cursor): Result<ReadOutput, ReadError>

}

export namespace Readable {

  export type Infer<T extends Readable> = Readable<Readable.ReadOutput<T>, Readable.ReadError<T>>

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
  export function tryReadOrRollback<T extends Infer<T>>(readable: T, cursor: Cursor): Result<ReadOutput<T>, ReadError<T>> {
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
  export function tryReadFromBytes<T extends Infer<T>>(readable: T, bytes: Uint8Array): Result<ReadOutput<T>, ReadError<T> | BinaryReadError> {
    return Result.unthrowSync(t => {
      const cursor = new Cursor(bytes)
      const output = readable.tryRead(cursor).throw(t)

      if (cursor.remaining)
        return new Err(CursorReadLengthUnderflowError.from(cursor))

      return new Ok(output)
    })
  }

}