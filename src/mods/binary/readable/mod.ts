// deno-lint-ignore-file no-namespace

import type { Nullable } from "@/libs/nullable/mod.ts";
import { Cursor } from "@hazae41/cursor";

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
  read(cursor: Cursor): Output

}

export namespace Readable {

  export type Output<Self> = Self extends Readable<infer Output> ? Output : never

  /**
   * Call read() on the given bytes and check for underflow
   * @throws whatever read() throws
   * @throws ReadUnderflowError on underflow
   * @param readable 
   * @param bytes 
   * @returns 
   */
  export function readFromBytes<T>(readable: Readable<T>, bytes: Uint8Array): T {
    const cursor = new Cursor(bytes)
    const output = readable.read(cursor)

    if (cursor.remaining)
      throw ReadUnderflowError.from(cursor)

    return output
  }

  /**
   * Call read() on the given bytes and check for underflow
   * @param readable 
   * @param bytes 
   * @returns 
   */
  export function readFromBytesOrNull<T>(readable: Readable<T>, bytes: Uint8Array): Nullable<T> {
    try {
      const cursor = new Cursor(bytes)
      const output = readable.read(cursor)

      if (cursor.remaining)
        return undefined

      return output
    } catch (e: unknown) {
      return
    }
  }

}