import { Bytes, Sized } from "@hazae41/bytes";
import { Cursor, CursorReadOverflowError, CursorWriteOverflowError } from "@hazae41/cursor";
import { Ok, Result } from "@hazae41/result";
import { Readable } from "mods/binary/readable.js";
import { Writable } from "./writable.js";

export class Opaque<T extends Bytes = Bytes> {

  /**
   * A binary data type that just holds bytes
   * @param bytes 
   */
  constructor(
    readonly bytes: T
  ) { }

  static empty() {
    return new this(Bytes.alloc(0))
  }

  static alloc<N extends number>(length: N) {
    return new this(Bytes.alloc(length))
  }

  static allocUnsafe<N extends number>(length: N) {
    return new this(Bytes.allocUnsafe(length))
  }

  static from<N extends number>(sized: Sized<number, N>) {
    return new this(Bytes.from(sized))
  }

  static random<N extends number>(length: N) {
    return new this(Bytes.random(length))
  }

  tryPrepare(): Result<this, never> {
    return new Ok(this)
  }

  trySize(): Result<number, never> {
    return new Ok(this.bytes.length)
  }

  tryWrite(cursor: Cursor): Result<void, CursorWriteOverflowError> {
    return cursor.tryWrite(this.bytes)
  }

  /**
   * Transform this opaque into a binary data type
   * @param readable 
   * @returns 
   */
  tryInto<T>(readable: Readable<T>): Result<T, Error> {
    return Readable.tryReadFromBytes(readable, this.bytes)
  }

  /**
   * Create an opaque from a binary data type
   * @param writable 
   * @returns 
   */
  static tryFrom(writable: Writable): Result<Opaque, Error> {
    const bytes = Writable.tryWriteToBytes(writable)

    if (bytes.isErr())
      return bytes

    return new Ok(new this(bytes.inner))
  }

}

/**
 * Read an opaque by viewing bytes
 */
export namespace UnsafeOpaque {

  export function tryRead(cursor: Cursor): Result<Opaque, CursorReadOverflowError> {
    const bytes = cursor.tryRead(cursor.remaining)

    if (bytes.isErr())
      return bytes

    return new Ok(new Opaque(bytes.inner))
  }

}

/**
 * Read an opaque by copying bytes
 */
export namespace SafeOpaque {

  export function tryRead(cursor: Cursor): Result<Opaque, CursorReadOverflowError> {
    const bytes = cursor.tryRead(cursor.remaining)

    if (bytes.isErr())
      return bytes

    const copy = new Uint8Array(bytes.inner)

    return new Ok(new Opaque(copy))
  }

}