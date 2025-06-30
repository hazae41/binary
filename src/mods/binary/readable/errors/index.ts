import { Cursor } from "@hazae41/cursor"

export type ReadError =
  | ReadUnderflowError
  | ReadUnknownError

export class ReadUnknownError extends Error {
  readonly #class = ReadUnknownError
  readonly name = this.#class.name

  constructor(options: ErrorOptions) {
    super(`Could not read`, options)
  }

  static from(cause: unknown) {
    return new ReadUnknownError({ cause })
  }

}

export class ReadUnderflowError extends Error {
  readonly #class = ReadUnderflowError
  readonly name = this.#class.name

  constructor(
    readonly cursorOffset: number,
    readonly cursorLength: number
  ) {
    super(`Cursor has ${cursorLength - cursorOffset} remaining bytes after read`)
  }

  static from(cursor: Cursor) {
    return new ReadUnderflowError(cursor.offset, cursor.length)
  }

}