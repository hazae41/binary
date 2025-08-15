import { Lengthed } from "@hazae41/lengthed";

export namespace Bytes {

  export function copy<N extends number>(bytes: Uint8Array & Lengthed<N>): Uint8Array<ArrayBuffer> & Lengthed<N> {
    return new Uint8Array(bytes) as Uint8Array<ArrayBuffer> & Lengthed<N>
  }

  export function from<N extends number>(bytes: Uint8Array & Lengthed<N>): Uint8Array<ArrayBuffer> & Lengthed<N> {
    if (bytes.buffer instanceof ArrayBuffer)
      return bytes as Uint8Array<ArrayBuffer> & Lengthed<N>
    return new Uint8Array(bytes) as Uint8Array<ArrayBuffer> & Lengthed<N>
  }

}