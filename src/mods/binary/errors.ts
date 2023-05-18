import { Cursor, CursorReadError, CursorWriteError } from "@hazae41/cursor"

export type BinaryError =
  | BinaryReadError
  | BinaryWriteError

export type BinaryReadError =
  | CursorReadLengthUnderflowError
  | CursorReadError

export class CursorReadLengthUnderflowError extends Error {
  readonly #class = CursorReadLengthUnderflowError

  constructor(
    readonly cursor: Cursor
  ) {
    super(`Cursor has ${cursor.remaining} remaining bytes after read`)
  }
}

export type BinaryWriteError =
  | CursorWriteLenghtUnderflowError
  | CursorWriteError

export class CursorWriteLenghtUnderflowError extends Error {
  readonly #class = CursorWriteLenghtUnderflowError

  constructor(
    readonly cursor: Cursor
  ) {
    super(`Cursor has ${cursor.remaining} remaining bytes after write`)
  }
}