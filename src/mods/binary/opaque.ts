import { Bytes } from "@hazae41/bytes";
import { Readable } from "mods/binary/readable.js";
import { Cursor } from "mods/cursor/cursor.js";
import { Writable } from "./writable.js";

export class Opaque {

  /**
   * A binary data type that just holds bytes
   * @param bytes 
   */
  constructor(
    readonly bytes: Uint8Array
  ) { }

  static empty() {
    return new this(new Uint8Array())
  }

  static alloc(length: number) {
    return new this(Bytes.alloc(length))
  }

  static allocUnsafe(length: number) {
    return new this(Bytes.allocUnsafe(length))
  }

  static random(length: number) {
    return new this(Bytes.random(length))
  }

  prepare() {
    return this
  }

  size() {
    return this.bytes.length
  }

  write(cursor: Cursor) {
    cursor.write(this.bytes)
  }

  /**
   * Transform this opaque into a binary data type
   * @param readable 
   * @returns 
   */
  into<T>(readable: Readable<T>) {
    return Readable.fromBytes(readable, this.bytes)
  }

  /**
   * Try to transform this opaque into a binary data type
   * @param readable 
   * @returns T or undefined
   */
  tryInto<T>(readable: Readable<T>) {
    return Readable.tryFromBytes(readable, this.bytes)
  }

  /**
   * Create an opaque from a binary data type
   * @param writable 
   * @returns 
   */
  static from(writable: Writable) {
    const bytes = Writable.toBytes(writable)
    return Readable.fromBytes(UnsafeOpaque, bytes)
  }

}

/**
 * Read an opaque by viewing bytes
 */
export namespace UnsafeOpaque {

  export function read(cursor: Cursor) {
    const bytes = cursor.read(cursor.remaining)

    return new Opaque(bytes)
  }

}

/**
 * Read an opaque by copying bytes
 */
export namespace SafeOpaque {

  export function read(cursor: Cursor) {
    const bytes = cursor.read(cursor.remaining)
    const copy = new Uint8Array(bytes)

    return new Opaque(copy)
  }

}