import { Bytes } from "@hazae41/bytes";
import { Result } from "@hazae41/result";
import { Writable } from "mods/binary/writable.js";

/**
 * A preparable binary data type
 */
export interface Preparable {

  /**
   * Prepare to a writable
   */
  prepare(): Result<Writable, Error>

}

export namespace Preparable {

  /**
    * Write a binary data type to bytes
    * @param writable 
    * @returns 
    */
  export function toBytes(preparable: Preparable): Result<Bytes, Error> {
    const writable = preparable.prepare()

    if (writable.isErr())
      return writable

    return Writable.toBytes(writable.inner)
  }

}