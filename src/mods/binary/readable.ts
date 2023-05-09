import { Cursor } from "@hazae41/cursor";
import { Err, Result } from "@hazae41/result";

/**
 * A readable binary data type
 */
export interface Readable<Output = unknown, Error = unknown> {

  /**
   * Read bytes from a cursor
   * @param cursor 
   */
  tryRead(cursor: Cursor): Result<Output, Error>

}

export class BinaryReadUnderflowError extends Error {
  readonly #class = BinaryReadUnderflowError

  constructor(
    readonly cursor: Cursor
  ) {
    super(`Binary read got ${cursor.remaining} remaining bytes`)
  }
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
  export function tryReadOrRollback<Output, Error>(readable: Readable<Output, Error>, cursor: Cursor): Result<Output, Error> {
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
  export function tryReadFromBytes<Output, Error>(readable: Readable<Output, Error>, bytes: Uint8Array): Result<Output, Error | BinaryReadUnderflowError> {
    const cursor = new Cursor(bytes)
    const result = readable.tryRead(cursor)

    if (result.isErr())
      return result

    if (cursor.remaining)
      return new Err(new BinaryReadUnderflowError(cursor))

    return result
  }

}