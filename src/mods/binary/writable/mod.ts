// deno-lint-ignore-file no-namespace

import { Cursor } from "@hazae41/cursor"

export class WriteUnderflowError extends Error {
  readonly #class = WriteUnderflowError
  readonly name: string = this.#class.name

  constructor(
    readonly cursorOffset: number,
    readonly cursorLength: number
  ) {
    super(`Cursor has ${cursorLength - cursorOffset} remaining bytes after write`)
  }

  static from(cursor: Cursor): WriteUnderflowError {
    return new WriteUnderflowError(cursor.offset, cursor.length)
  }

}

/**
 * A writable binary data type
 */
export interface Writable {

  /**
   * Compute the amount of bytes to allocate
   */
  size(): number

  /**
   * Write to a cursor
   * @param cursor 
   */
  write(cursor: Cursor): void

}

export namespace Writable {

  /**
   * Call write() on size()-sized bytes and check for underflow
   * @throws whatever size() or write() throws
   * @param writable 
   * @returns 
   */
  export function writeToBytes(writable: Writable): Uint8Array<ArrayBuffer> {
    const size = writable.size()

    const bytes = new Uint8Array(size)
    const cursor = new Cursor(bytes)

    writable.write(cursor)

    if (cursor.remaining)
      throw WriteUnderflowError.from(cursor)

    return bytes
  }

}