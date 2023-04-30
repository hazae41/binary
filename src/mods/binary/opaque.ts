import { Bytes, Sized } from "@hazae41/bytes";
import { Cursor } from "@hazae41/cursor";
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

  prepare(): Result<this, never> {
    return new Ok(this)
  }

  size() {
    return this.bytes.length
  }

  write(cursor: Cursor): Result<void, Error> {
    return cursor.write(this.bytes)
  }

  /**
   * Transform this opaque into a binary data type
   * @param readable 
   * @returns 
   */
  tryInto<T>(readable: Readable<T>): Result<T, Error> {
    return Readable.fromBytes(readable, this.bytes)
  }

  /**
   * Create an opaque from a binary data type
   * @param writable 
   * @returns 
   */
  static tryFrom(writable: Writable): Result<Opaque, Error> {
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

    const copy = new Uint8Array(bytes.inner)

    return new Ok(new Opaque(copy))
  }

}