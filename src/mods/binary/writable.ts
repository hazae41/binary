import { Cursor } from "@hazae41/cursor"
import { Err, Ok, Result } from "@hazae41/result"
import { SizeUnknownError, WriteUnderflowError, WriteUnknownError } from "./errors.js"

/**
 * A writable binary data type
 */
export interface Writable {

  /**
   * Compute the amount of bytes to allocate
   */
  sizeOrThrow(): number

  /**
   * Write to a cursor
   * @param cursor 
   */
  writeOrThrow(cursor: Cursor): void

}

export namespace Writable {

  export function trySize(writable: Writable) {
    return Result.runAndWrapSync(() => {
      return writable.sizeOrThrow()
    }).mapErrSync(SizeUnknownError.from)
  }

  export function tryWrite(writable: Writable, cursor: Cursor) {
    return Result.runAndWrapSync(() => {
      writable.writeOrThrow(cursor)
    }).mapErrSync(WriteUnknownError.from)
  }

  /**
   * Call writeOrThrow() on sizeOrThrow()-sized bytes and check for underflow
   * @throws whatever sizeOrThrow() or writeOrThrow() throws
   * @param writable 
   * @returns 
   */
  export function writeToBytesOrThrow(writable: Writable) {
    const size = writable.sizeOrThrow()

    const bytes = new Uint8Array(size)
    const cursor = new Cursor(bytes)

    writable.writeOrThrow(cursor)

    if (cursor.remaining)
      throw WriteUnderflowError.from(cursor)

    return bytes
  }

  /**
   * Call writeOrThrow() on sizeOrThrow()-sized bytes and check for underflow
   * @param writable 
   * @returns 
   */
  export function tryWriteToBytes(writable: Writable): Result<Uint8Array, SizeUnknownError | WriteUnknownError | WriteUnderflowError> {
    return Result.unthrowSync(t => {
      const size = trySize(writable).throw(t)

      const bytes = new Uint8Array(size)
      const cursor = new Cursor(bytes)

      tryWrite(writable, cursor).throw(t)

      if (cursor.remaining)
        return new Err(WriteUnderflowError.from(cursor))

      return new Ok(bytes)
    })
  }

}