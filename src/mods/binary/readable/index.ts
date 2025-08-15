export * from "./errors/index.js";

import { Cursor } from "@hazae41/cursor";
import { ReadUnderflowError } from "./errors/index.js";

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
   * Call readOrThrow() on the given bytes and check for underflow
   * @param readable 
   * @param bytes 
   * @returns 
   */
  export function readFromBytesOrNull<T extends Infer<T>>(readable: T, bytes: Uint8Array): Output<T> | undefined {
    try {
      const cursor = new Cursor(bytes)
      const output = readable.readOrThrow(cursor)

      if (cursor.remaining)
        return undefined

      return output
    } catch (e: unknown) {
      return undefined
    }
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

}