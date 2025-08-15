import { Cursor } from "@hazae41/cursor";
import { Bytes, BytesLike } from "libs/bytes/index.js";
import { Readable } from "mods/binary/readable/index.js";
import { Writable } from "../writable/index.js";

export class Opaque<N extends number = number> {

  constructor(
    readonly bytes: Bytes<N>
  ) { }

  sizeOrThrow() {
    return this.bytes.length
  }

  writeOrThrow(cursor: Cursor) {
    cursor.writeOrThrow(this.bytes)
  }

  cloneOrThrow() {
    return new Opaque(Bytes.copy(this.bytes))
  }

  readIntoOrThrow<T extends Readable.Infer<T>>(readable: T): Readable.Output<T> {
    return Readable.readFromBytesOrThrow(readable, this.bytes)
  }

}

export namespace Opaque {

  export function readOrThrow(cursor: Cursor<ArrayBuffer>) {
    return new Opaque(cursor.readOrThrow(cursor.remaining))
  }

  export function writeFromOrThrow(writable: Writable): Opaque {
    if (writable instanceof Opaque)
      return writable
    return new Opaque(Writable.writeToBytesOrThrow(writable))
  }

}

export class OpaqueLike<N extends number = number> {

  constructor(
    readonly bytes: BytesLike<N>
  ) { }

  sizeOrThrow() {
    return this.bytes.length
  }

  writeOrThrow(cursor: Cursor) {
    cursor.writeOrThrow(this.bytes)
  }

  cloneOrThrow() {
    return new OpaqueLike(Bytes.copy(this.bytes))
  }

  readIntoOrThrow<T extends Readable.Infer<T>>(readable: T): Readable.Output<T> {
    return Readable.readFromBytesOrThrow(readable, Bytes.from(this.bytes))
  }

}

export namespace OpaqueLike {

  export function readOrThrow(cursor: Cursor<ArrayBufferLike>) {
    return new OpaqueLike(cursor.readOrThrow(cursor.remaining))
  }

  export function writeFromOrThrow(writable: Writable): OpaqueLike {
    if (writable instanceof OpaqueLike)
      return writable
    return new OpaqueLike(Writable.writeToBytesOrThrow(writable))
  }

}