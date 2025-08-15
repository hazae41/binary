import { Lengthed } from "@hazae41/lengthed";

export type Bytes<N extends number = number> = Uint8Array<ArrayBuffer> & Lengthed<N>

export type BytesLike<N extends number = number> = Uint8Array<ArrayBufferLike> & Lengthed<N>

export namespace Bytes {

  export function copy<N extends number>(bytes: BytesLike<N>): Bytes<N> {
    return new Uint8Array(bytes) as Bytes<N>
  }

  export function from<N extends number>(bytes: BytesLike<N>): Bytes<N> {
    if (bytes.buffer instanceof ArrayBuffer)
      return bytes as Bytes<N>
    return new Uint8Array(bytes) as Bytes<N>
  }

}