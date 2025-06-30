import { Cursor } from "@hazae41/cursor";
import { Copiable } from "@hazae41/uncopy";
import { Uint8Array } from "libs/bytes/index.js";
import { Readable } from "mods/binary/readable/index.js";
import { Writable } from "../writable/index.js";

export type Opaque<N extends number = number> =
  | Opaque.Copied<N>
  | Opaque.Uncopied<N>

export namespace Opaque {

  export function writeFromOrThrow(writable: Writable): Opaque {
    if (writable instanceof Opaque.Uncopied)
      return writable
    if (writable instanceof Opaque.Copied)
      return writable
    return new Copied(Writable.writeToBytesOrThrow(writable))
  }

  export class Copied<N extends number = number> implements Copiable<N> {

    readonly copied = true

    constructor(
      readonly bytes: Uint8Array<N>
    ) { }

    static readOrThrow(cursor: Cursor) {
      return new Copied(cursor.readOrThrow(cursor.remaining).copy().get())
    }

    get() {
      return this.bytes
    }

    copy() {
      return this
    }

    sizeOrThrow() {
      return this.bytes.length
    }

    writeOrThrow(cursor: Cursor) {
      cursor.writeOrThrow(this.bytes)
    }

    readIntoOrThrow<T extends Readable.Infer<T>>(readable: T): Readable.Output<T> {
      return Readable.readFromBytesOrThrow(readable, this.bytes)
    }

  }

  export class Uncopied<N extends number = number> implements Copiable {

    readonly copied = false

    constructor(
      readonly bytes: Uint8Array<N>
    ) { }

    static readOrThrow(cursor: Cursor) {
      return new Uncopied(cursor.readOrThrow(cursor.remaining).get())
    }

    get() {
      return this.bytes
    }

    copy() {
      return new Copied(new Uint8Array(this.bytes) as Uint8Array<N>)
    }

    sizeOrThrow() {
      return this.bytes.length
    }

    writeOrThrow(cursor: Cursor) {
      cursor.writeOrThrow(this.bytes)
    }

    readIntoOrThrow<T extends Readable.Infer<T>>(readable: T): Readable.Output<T> {
      return Readable.readFromBytesOrThrow(readable, this.bytes)
    }

  }

}