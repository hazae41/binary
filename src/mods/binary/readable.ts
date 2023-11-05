import { Cursor } from "@hazae41/cursor";
import { Err, Ok, Result } from "@hazae41/result";
import { ReadUnderflowError, ReadUnknownError } from "./errors.js";

/**
 * A readable binary data type
 */
export interface Readable<Output = unknown> {

  /**
   * Read from a cursor
   * @param cursor 
   */
  readOrThrow(cursor: Cursor): Output

}

export namespace Readable {

  export type Infer<T extends Readable> = Readable<Readable.Output<T>>

  export type Output<T extends Readable> = T extends Readable<infer O> ? O : never

  export function tryRead<T extends Infer<T>>(readable: T, cursor: Cursor): Result<Output<T>, ReadUnknownError> {
    return Result.runAndWrapSync(() => {
      return readable.readOrThrow(cursor)
    }).mapErrSync(ReadUnknownError.from)
  }

  /**
   * Call readOrThrow() but rollback the cursor on error
   * @throws whatever readOrThrow() throws
   * @param readable 
   * @param cursor 
   * @returns 
   */
  export function readOrRollbackAndThrow<T extends Infer<T>>(readable: T, cursor: Cursor): Output<T> {
    const offset = cursor.offset

    try {
      return readable.readOrThrow(cursor)
    } catch (e: unknown) {
      cursor.offset = offset
      throw e
    }
  }

  /**
   * Call readOrThrow() but rollback the cursor on error
   * @param readable 
   * @param cursor 
   * @returns 
   */
  export function tryReadOrRollback<T extends Infer<T>>(readable: T, cursor: Cursor): Result<Output<T>, ReadUnknownError> {
    const offset = cursor.offset
    const output = tryRead(readable, cursor)

    if (output.isErr())
      cursor.offset = offset

    return output
  }

  /**
   * Call readOrThrow() on the given bytes and check for underflow
   * @throws whatever readOrThrow() throws
   * @throws ReadUnderflowError on underflow
   * @param readable 
   * @param bytes 
   * @returns 
   */
  export function readFromBytesOrThrow<T extends Infer<T>>(readable: T, bytes: Uint8Array): Output<T> {
    const cursor = new Cursor(bytes)
    const output = readable.readOrThrow(cursor)

    if (cursor.remaining)
      throw ReadUnderflowError.from(cursor)

    return output
  }

  /**
   * Call readOrThrow() on the given bytes and check for underflow
   * @param readable 
   * @param bytes 
   * @returns 
   */
  export function tryReadFromBytes<T extends Infer<T>>(readable: T, bytes: Uint8Array): Result<Output<T>, ReadUnknownError | ReadUnderflowError> {
    return Result.unthrowSync(t => {
      const cursor = new Cursor(bytes)
      const output = tryRead(readable, cursor).throw(t)

      if (cursor.remaining)
        return new Err(ReadUnderflowError.from(cursor))

      return new Ok(output)
    })
  }

}