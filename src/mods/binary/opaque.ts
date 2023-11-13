import { Cursor } from "@hazae41/cursor";
import { Ok, Result } from "@hazae41/result";
import { Readable } from "mods/binary/readable.js";
import { ReadError, WriteError } from "./errors.js";
import { Writable } from "./writable.js";

export class Opaque<T extends Uint8Array = Uint8Array> {

  /**
   * A binary data type that just holds bytes
   * @param bytes 
   */
  constructor(
    readonly bytes: T
  ) { }

  /**
   * View bytes into a new Opaque
   * @param bytes 
   * @returns 
   */
  static new<T extends Uint8Array>(bytes: T) {
    return new Opaque(bytes)
  }

  /**
   * Copy bytes into a new Opaque
   * @param bytes 
   * @returns 
   */
  static from(bytes: Uint8Array) {
    return new Opaque(new Uint8Array(bytes))
  }

  sizeOrThrow() {
    return this.bytes.length
  }

  writeOrThrow(cursor: Cursor) {
    cursor.tryWrite(this.bytes)
  }

  /**
   * Transform this opaque into a binary data type
   * @param readable 
   * @returns 
   */
  readIntoOrThrow<T extends Readable.Infer<T>>(readable: T): Readable.Output<T> {
    return Readable.readFromBytesOrThrow(readable, this.bytes)
  }

  /**
   * Transform this opaque into a binary data type
   * @param readable 
   * @returns 
   */
  tryReadInto<T extends Readable.Infer<T>>(readable: T): Result<Readable.Output<T>, ReadError> {
    return Readable.tryReadFromBytes(readable, this.bytes)
  }

  /**
   * Create an opaque from a binary data type
   * @param writable 
   * @returns 
   */
  static writeFromOrThrow(writable: Writable): Opaque {
    return new Opaque(Writable.writeToBytesOrThrow(writable))
  }

  /**
   * Create an opaque from a binary data type
   * @param writable 
   * @returns 
   */
  static tryWriteFrom(writable: Writable): Result<Opaque, WriteError> {
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
  export function readOrThrow(cursor: Cursor) {
    return new Opaque(cursor.readOrThrow(cursor.remaining))
  }

  /**
   * Perform unsafe zero-copy conversion to Opaque if already Opaque
   * @param writable 
   * @returns 
   */
  export function writeFromOrThrow(writable: Writable) {
    if (writable instanceof Opaque)
      return writable
    return Opaque.writeFromOrThrow(writable)
  }

  /**
   * Perform unsafe zero-copy conversion to Opaque if already Opaque
   * @param writable 
   * @returns 
   */
  export function tryWriteFrom(writable: Writable): Result<Opaque, WriteError> {
    if (writable instanceof Opaque)
      return new Ok(writable)
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
  export function readOrThrow(cursor: Cursor) {
    return new Opaque(cursor.readAndCopyOrThrow(cursor.remaining))
  }

  /**
   * Perform safe copy conversion to Opaque if already Opaque
   * @param writable 
   * @returns 
   */
  export function writeFromOrThrow(writable: Writable) {
    if (writable instanceof Opaque)
      return Opaque.from(writable.bytes)
    return Opaque.writeFromOrThrow(writable)
  }

  /**
   * Perform safe copy conversion to Opaque if already Opaque
   * @param writable 
   * @returns 
   */
  export function tryWriteFrom(writable: Writable): Result<Opaque, WriteError> {
    if (writable instanceof Opaque)
      return new Ok(Opaque.from(writable.bytes))
    return Opaque.tryWriteFrom(writable)
  }

}