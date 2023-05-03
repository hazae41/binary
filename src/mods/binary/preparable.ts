import { Bytes } from "@hazae41/bytes";
import { Result } from "@hazae41/result";
import { BinaryWriteUnderflowError, Writable } from "mods/binary/writable.js";

/**
 * A preparable binary data type
 */
export interface Preparable<T extends Writable = Writable> {

  /**
   * Prepare to a writable
   */
  tryPrepare(): Result<T, Error>

}

export class UnpreparedError extends Error {
  readonly #class = UnpreparedError

  constructor(
    readonly name: string
  ) {
    super(`Unprepared ${name}`)
  }
}

export namespace Preparable {

  /**
    * Write a binary data type to bytes
    * @param writable 
    * @returns 
    */
  export function tryPrepareToBytes(preparable: Preparable): Result<Bytes, Error | BinaryWriteUnderflowError> {
    return preparable.tryPrepare().andThenSync(Writable.tryWriteToBytes)
  }

}