import { Cursor } from "@hazae41/cursor";
import { Readable } from "mods/binary/readable.js";
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
    cursor.writeOrThrow(this.bytes)
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
   * Create an opaque from a binary data type
   * @param writable 
   * @returns 
   */
  static writeFromOrThrow(writable: Writable): Opaque {
    return new Opaque(Writable.writeToBytesOrThrow(writable))
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

}