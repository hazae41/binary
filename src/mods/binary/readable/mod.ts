import type { Nullable } from "@/libs/nullable/mod.ts";
import { Cursor } from "@hazae41/cursor";

export type ReadError =
  | ReadUnderflowError
  | ReadUnknownError

export class ReadUnknownError extends Error {
  readonly #class = ReadUnknownError
  readonly name: string = this.#class.name

  constructor(options: ErrorOptions) {
    super(`Could not read`, options)
  }

  static from(cause: unknown): ReadUnknownError {
    return new ReadUnknownError({ cause })
  }

}

export class ReadUnderflowError extends Error {
  readonly #class = ReadUnderflowError
  readonly name: string = this.#class.name

  constructor(
    readonly cursorOffset: number,
    readonly cursorLength: number
  ) {
    super(`Cursor has ${cursorLength - cursorOffset} remaining bytes after read`)
  }

  static from(cursor: Cursor): ReadUnderflowError {
    return new ReadUnderflowError(cursor.offset, cursor.length)
  }

}

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

  export type Output<T extends Readable> = T extends Readable<infer O> ? O : never

  /**
   * Call readOrThrow() but rollback the cursor on error
   * @throws whatever readOrThrow() throws
   * @param readable 
   * @param cursor 
   * @returns 
   */
  export function readOrRollbackAndThrow<T>(readable: Readable<T>, cursor: Cursor): T {
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
  export function readFromBytesOrNull<T>(readable: Readable<T>, bytes: Uint8Array): Nullable<T> {
    try {
      const cursor = new Cursor(bytes)
      const output = readable.readOrThrow(cursor)

      if (cursor.remaining)
        return undefined

      return output
    } catch (e: unknown) {
      return
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
  export function readFromBytesOrThrow<T>(readable: Readable<T>, bytes: Uint8Array): T {
    const cursor = new Cursor(bytes)
    const output = readable.readOrThrow(cursor)

    if (cursor.remaining)
      throw ReadUnderflowError.from(cursor)

    return output
  }

}