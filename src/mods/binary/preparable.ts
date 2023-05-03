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
  tryPrepare(): Result<Writable, Error>

}

export namespace Preparable {

  /**
    * Write a binary data type to bytes
    * @param writable 
    * @returns 
    */
  export function tryPrepareToBytes(preparable: Preparable): Result<Bytes, Error> {
    return preparable.tryPrepare().andThenSync(Writable.tryWriteToBytes)
  }

}