import { Bytes } from "@hazae41/bytes";
import { Cursor } from "@hazae41/cursor";
import { Ok, Result } from "@hazae41/result";
import { Readable } from "mods/binary/readable.js";
import { BinaryReadError, BinaryWriteError } from "./errors.js";
import { Writable } from "./writable.js";

export class Opaque<T extends Uint8Array = Uint8Array> {

  /**
   * A binary data type that just holds bytes
   * @param bytes 
   */
  constructor(
    readonly bytes: T
  ) { }

  [Symbol.dispose]() { }

  static new<T extends Uint8Array>(bytes: T) {
    return new Opaque(bytes)
  }

  /**
   * Size this
   * @returns 
   */
  trySize(): Result<number, never> {
    return new Ok(this.bytes.length)
  }

  /**
   * Write this
   * @param cursor 
   * @returns 
   */
  tryWrite(cursor: Cursor): Result<void, BinaryWriteError> {
    return cursor.tryWrite(this.bytes)
  }

  /**
   * Transform this opaque into a binary data type
   * @param readable 
   * @returns 
   */
  tryReadInto<T extends Readable.Infer<T>>(readable: T): Result<Readable.ReadOutput<T>, Readable.ReadError<T> | BinaryReadError> {
    return Readable.tryReadFromBytes(readable, this.bytes)
  }

  /**
   * Create an opaque from a binary data type
   * @param writable 
   * @returns 
   */
  static tryWriteFrom<T extends Writable.Infer<T>>(writable: T): Result<Opaque, Writable.SizeError<T> | Writable.WriteError<T> | BinaryWriteError> {
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
  export function tryRead(cursor: Cursor): Result<Opaque, BinaryReadError> {
    return cursor.tryRead(cursor.remaining).mapSync(Opaque.new)
  }

  /**
   * Perform unsafe zero-copy conversion to `Opaque` if `T instanceof Opaque`, else use `Opaque.tryWriteFrom`
   * @param writable 
   * @returns 
   */
  export function tryWriteFrom<T extends Writable.Infer<T>>(writable: T): Result<Opaque, Writable.SizeError<T> | Writable.WriteError<T> | BinaryWriteError> {
    if (writable instanceof Opaque)
      return new Ok(new Opaque(writable.bytes))
    return Opaque.tryWriteFrom(writable)
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
  export function tryRead(cursor: Cursor): Result<Opaque, BinaryReadError> {
    return cursor.tryRead(cursor.remaining).mapSync(Bytes.from).mapSync(Opaque.new)
  }

  /**
   * Perform safe copy conversion to `Opaque` if `T instanceof Opaque`, else use `Opaque.tryWriteFrom`
   * @param writable 
   * @returns 
   */
  export function tryWriteFrom<T extends Writable.Infer<T>>(writable: T): Result<Opaque, Writable.SizeError<T> | Writable.WriteError<T> | BinaryWriteError> {
    if (writable instanceof Opaque)
      return Bytes.tryFrom(writable.bytes).mapSync(Opaque.new)
    return Opaque.tryWriteFrom(writable)
  }

}