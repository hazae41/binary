import { Bytes, BytesAllocError, Sized } from "@hazae41/bytes";
import { Cursor } from "@hazae41/cursor";
import { Ok, Result } from "@hazae41/result";
import { Readable } from "mods/binary/readable.js";
import { BinaryReadError, BinaryWriteError } from "./errors.js";
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

  /**
   * Bytes.empty
   * @deprecated
   * @returns 
   */
  static empty() {
    return new Opaque(Bytes.alloc(0))
  }

  /**
   * Bytes.tryEmpty
   * @returns 
   */
  static tryEmpty(): Result<Opaque<Bytes<0>>, BytesAllocError<0>> {
    return Bytes.tryEmpty().mapSync(Opaque.new)
  }

  /**
   * Bytes.alloc
   * @deprecated
   * @param length 
   * @returns 
   */
  static alloc<N extends number>(length: N) {
    return new Opaque(Bytes.alloc(length))
  }

  /**
   * Bytes.tryAlloc
   * @param length 
   * @returns 
   */
  static tryAlloc<N extends number>(length: N): Result<Opaque<Bytes<N>>, BytesAllocError<N>> {
    return Bytes.tryAlloc(length).mapSync(Opaque.new)
  }

  /**
   * Bytes.allocUnsafe
   * @deprecated
   * @param length 
   * @returns 
   */
  static allocUnsafe<N extends number>(length: N) {
    return new Opaque(Bytes.allocUnsafe(length))
  }

  /**
   * Bytes.tryAllocUnsafe
   * @param length 
   * @returns 
   */
  static tryAllocUnsafe<N extends number>(length: N): Result<Opaque<Bytes<N>>, BytesAllocError<N>> {
    return Bytes.tryAllocUnsafe(length).mapSync(Opaque.new)
  }

  /**
   * Bytes.from
   * @deprecated
   * @param sized 
   * @returns 
   */
  static from<N extends number>(sized: Sized<number, N>) {
    return new Opaque(Bytes.from(sized))
  }

  /**
   * Bytes.tryFrom
   * @param sized 
   * @returns 
   */
  static tryFrom<N extends number>(sized: Sized<number, N>): Result<Opaque<Bytes<N>>, BytesAllocError<N>> {
    return Bytes.tryFrom(sized).mapSync(Opaque.new)
  }

  /**
   * Bytes.random
   * @deprecated
   * @param length 
   * @returns 
   */
  static random<N extends number>(length: N) {
    return new Opaque(Bytes.random(length))
  }

  /**
   * Bytes.tryRandom
   * @param length 
   * @returns 
   */
  static tryRandom<N extends number>(length: N): Result<Opaque<Bytes<N>>, BytesAllocError<N>> {
    return Bytes.tryRandom(length).mapSync(Opaque.new)
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
   * Perform unsafe zero-copy conversion to `Opaque` if `T instanceof Opaque`, else use `Opaque.tryFrom`
   * @param writable 
   * @returns 
   */
  export function tryFrom<T extends Writable.Infer<T>>(writable: T): Result<Opaque, Writable.SizeError<T> | Writable.WriteError<T> | BinaryWriteError> {
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
  export function tryRead(cursor: Cursor): Result<Opaque, BinaryReadError> {
    return cursor.tryRead(cursor.remaining).mapSync(Opaque.from)
  }

  /**
   * Perform safe, copy conversion to `Opaque` using `Opaque.tryFrom`
   * @param writable 
   * @returns 
   */
  export function tryFrom<T extends Writable.Infer<T>>(writable: T): Result<Opaque, Writable.SizeError<T> | Writable.WriteError<T> | BinaryWriteError> {
    if (writable instanceof Opaque)
      return Opaque.tryFrom(writable.bytes)
    return Opaque.tryWriteFrom(writable)
  }


}