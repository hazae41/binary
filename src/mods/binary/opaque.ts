import { Bytes, Sized } from "@hazae41/bytes";
import { Cursor, CursorReadLengthOverflowError, CursorWriteLengthOverflowError } from "@hazae41/cursor";
import { Ok, Result } from "@hazae41/result";
import { Readable } from "mods/binary/readable.js";
import { CursorReadLengthUnderflowError, CursorWriteLenghtUnderflowError } from "./errors.js";
import { Writable } from "./writable.js";

export class Opaque<T extends Bytes = Bytes> {

  /**
   * A binary data type that just holds bytes
   * @param bytes 
   */
  constructor(
    readonly bytes: T
  ) { }

  static new<T extends Bytes>(bytes: T) {
    return new Opaque(bytes)
  }

  static empty() {
    return new Opaque(Bytes.alloc(0))
  }

  static alloc<N extends number>(length: N) {
    return new Opaque(Bytes.alloc(length))
  }

  static allocUnsafe<N extends number>(length: N) {
    return new Opaque(Bytes.allocUnsafe(length))
  }

  static from<N extends number>(sized: Sized<number, N>) {
    return new Opaque(Bytes.from(sized))
  }

  static random<N extends number>(length: N) {
    return new Opaque(Bytes.random(length))
  }

  tryPrepare(): Result<this, never> {
    return new Ok(this)
  }

  trySize(): Result<number, never> {
    return new Ok(this.bytes.length)
  }

  tryWrite(cursor: Cursor): Result<void, CursorWriteLengthOverflowError> {
    return cursor.tryWrite(this.bytes)
  }

  /**
   * Transform this opaque into a binary data type
   * @param readable 
   * @returns 
   */
  tryInto<T extends Readable>(readable: T): Result<Readable.ReadOutput<T>, Readable.ReadError<T> | CursorReadLengthUnderflowError> {
    return Readable.tryReadFromBytes(readable, this.bytes)
  }

  /**
   * Create an opaque from a binary data type
   * @param writable 
   * @returns 
   */
  static tryFrom<T extends Writable>(writable: T): Result<Opaque, Writable.SizeError<T> | Writable.WriteError<T> | CursorWriteLenghtUnderflowError> {
    return Writable.tryWriteToBytes(writable).mapSync(Opaque.new)
  }

}

/**
 * Read an opaque by viewing bytes
 */
export namespace UnsafeOpaque {

  /**
   * Unsafe zero-copy read remaining bytes from cursor
   * @param cursor 
   * @returns 
   */
  export function tryRead(cursor: Cursor): Result<Opaque, CursorReadLengthOverflowError> {
    return cursor.tryRead(cursor.remaining).mapSync(Opaque.new)
  }

  /**
   * Perform unsafe zero-copy conversion to `Opaque` if `T instanceof Opaque`, else use `Opaque.tryFrom`
   * @param writable 
   * @returns 
   */
  export function tryFrom<T extends Writable>(writable: T): Result<Opaque, Writable.SizeError<T> | Writable.WriteError<T> | CursorWriteLenghtUnderflowError> {
    if (writable instanceof Opaque)
      return new Ok(Opaque.new(writable.bytes))
    return Opaque.tryFrom(writable)
  }

}

/**
 * Read an opaque by copying bytes
 */
export namespace SafeOpaque {

  /**
   * Safe copy read remaining bytes from cursor
   * @param cursor 
   * @returns 
   */
  export function tryRead(cursor: Cursor): Result<Opaque, CursorReadLengthOverflowError> {
    return cursor.tryRead(cursor.remaining).mapSync(Opaque.from)
  }

  /**
   * Perform safe, copy conversion to `Opaque` using `Opaque.tryFrom`
   * @param writable 
   * @returns 
   */
  export function tryFrom<T extends Writable>(writable: T): Result<Opaque, Writable.SizeError<T> | Writable.WriteError<T> | CursorWriteLenghtUnderflowError> {
    return Opaque.tryFrom(writable)
  }


}