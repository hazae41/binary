import { Cursor } from "@hazae41/cursor"

export type ReadWriteError =
  | ReadError
  | WriteError

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

export type WriteError =
  | SizeUnknownError
  | WriteUnderflowError
  | WriteUnknownError

export class SizeUnknownError extends Error {
  readonly #class = SizeUnknownError
  readonly name = this.#class.name

  constructor(options: ErrorOptions) {
    super(`Could not size`, options)
  }

  static from(cause: unknown) {
    return new SizeUnknownError({ cause })
  }

}

export class WriteUnknownError extends Error {
  readonly #class = WriteUnderflowError
  readonly name = this.#class.name

  constructor(options: ErrorOptions) {
    super(`Could not write`, options)
  }

  static from(cause: unknown) {
    return new WriteUnknownError({ cause })
  }

}

export class WriteUnderflowError extends Error {
  readonly #class = WriteUnderflowError
  readonly name = this.#class.name

  constructor(
    readonly cursorOffset: number,
    readonly cursorLength: number
  ) {
    super(`Cursor has ${cursorLength - cursorOffset} remaining bytes after write`)
  }

  static from(cursor: Cursor) {
    return new WriteUnderflowError(cursor.offset, cursor.length)
  }

}