import { Bytes } from "@hazae41/bytes";
import { Cursor } from "@hazae41/cursor";
import { Ok, Result } from "@hazae41/result";
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

  static empty() {
    return new this(Bytes.alloc(0))
  }

  static alloc<N extends number>(length: N) {
    return new this(Bytes.alloc(length))
  }

  static allocUnsafe<N extends number>(length: N) {
    return new this(Bytes.allocUnsafe(length))
  }

  static random<N extends number>(length: N) {
    return new this(Bytes.random(length))
  }

  prepare() {
    return this
  }

  size() {
    return this.bytes.length
  }

  write(cursor: Cursor) {
    return cursor.write(this.bytes)
  }

  /**
   * Transform this opaque into a binary data type
   * @param readable 
   * @returns 
   */
  into<T>(readable: Readable<T>): Result<T, Error> {
    return Readable.fromBytes(readable, this.bytes)
  }

  /**
   * Create an opaque from a binary data type
   * @param writable 
   * @returns 
   */
  static from(writable: Writable) {
    const bytes = Writable.toBytes(writable)

    if (bytes.isErr())
      return bytes

    return Readable.fromBytes(UnsafeOpaque, bytes.inner)
  }

}

/**
 * Read an opaque by viewing bytes
 */
export namespace UnsafeOpaque {

  export function read(cursor: Cursor): Result<Opaque, Error> {
    const bytes = cursor.read(cursor.remaining)

    if (bytes.isErr())
      return bytes

    return new Ok(new Opaque(bytes.inner))
  }

}

/**
 * Read an opaque by copying bytes
 */
export namespace SafeOpaque {

  export function read(cursor: Cursor): Result<Opaque, Error> {
    const bytes = cursor.read(cursor.remaining)

    if (bytes.isErr())
      return bytes

    return new Ok(new Opaque(new Uint8Array(bytes.inner)))
  }

}