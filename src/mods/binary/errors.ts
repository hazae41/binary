import { BytesAllocError, BytesCastError } from "@hazae41/bytes"
import { Cursor, CursorReadError, CursorWriteError } from "@hazae41/cursor"

export type BinaryError =
  | BinaryReadError
  | BinaryWriteError

export type BinaryReadError =
  | BytesCastError
  | CursorReadLengthUnderflowError
  | CursorReadError

export class CursorReadLengthUnderflowError extends Error {
  readonly #class = CursorReadLengthUnderflowError
  readonly name = this.#class.name

  constructor(
    readonly cursor: Cursor
  ) {
    super(`Cursor has ${cursor.remaining} remaining bytes after read`)
  }
}

export type BinaryWriteError =
  | BytesAllocError
  | CursorWriteLenghtUnderflowError
  | CursorWriteError

export class CursorWriteLenghtUnderflowError extends Error {
  readonly #class = CursorWriteLenghtUnderflowError
  readonly name = this.#class.name

  constructor(
    readonly cursor: Cursor
  ) {
    super(`Cursor has ${cursor.remaining} remaining bytes after write`)
  }
}