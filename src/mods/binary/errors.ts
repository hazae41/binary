import { BytesError } from "@hazae41/bytes"
import { Cursor, CursorReadError, CursorWriteError } from "@hazae41/cursor"

export type BinaryError =
  | BinaryReadError
  | BinaryWriteError

export type BinaryReadError =
  | BytesError
  | CursorReadLengthUnderflowError
  | CursorReadError

export class CursorReadLengthUnderflowError extends Error {
  readonly #class = CursorReadLengthUnderflowError
  readonly name = this.#class.name

  constructor(
    readonly cursorOffset: number,
    readonly cursorLength: number
  ) {
    super(`Cursor has ${cursorLength - cursorOffset} remaining bytes after read`)
  }

  static from(cursor: Cursor) {
    return new CursorReadLengthUnderflowError(cursor.offset, cursor.length)
  }

}

export type BinaryWriteError =
  | BytesError
  | CursorWriteLenghtUnderflowError
  | CursorWriteError

export class CursorWriteLenghtUnderflowError extends Error {
  readonly #class = CursorWriteLenghtUnderflowError
  readonly name = this.#class.name

  constructor(
    readonly cursorOffset: number,
    readonly cursorLength: number
  ) {
    super(`Cursor has ${cursorLength - cursorOffset} remaining bytes after write`)
  }

  static from(cursor: Cursor) {
    return new CursorWriteLenghtUnderflowError(cursor.offset, cursor.length)
  }

}