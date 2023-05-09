import { Bytes, Sized } from "@hazae41/bytes";
import { Cursor, CursorReadLengthOverflowError, CursorWriteLengthOverflowError } from "@hazae41/cursor";
import { Ok, Result } from "@hazae41/result";
import { BinaryReadUnderflowError, Readable } from "mods/binary/readable.js";
import { BinaryWriteUnderflowError, Writable } from "./writable.js";

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
  tryInto<Output, Error>(readable: Readable<Output, Error>): Result<Output, Error | BinaryReadUnderflowError> {
    return Readable.tryReadFromBytes(readable, this.bytes)
  }

  /**
   * Create an opaque from a binary data type
   * @param writable 
   * @returns 
   */
  static tryFrom<SizeError, WriteError>(writable: Writable<SizeError, WriteError>): Result<Opaque, SizeError | WriteError | BinaryWriteUnderflowError> {
    return Writable.tryWriteToBytes(writable).mapSync(Opaque.new)
  }

}

/**
 * Read an opaque by viewing bytes
 */
export namespace UnsafeOpaque {

  export function tryRead(cursor: Cursor): Result<Opaque, CursorReadLengthOverflowError> {
    return cursor.tryRead(cursor.remaining).mapSync(Opaque.new)
  }

}

/**
 * Read an opaque by copying bytes
 */
export namespace SafeOpaque {

  export function tryRead(cursor: Cursor): Result<Opaque, CursorReadLengthOverflowError> {
    return cursor.tryRead(cursor.remaining).mapSync(Opaque.from)
  }

}