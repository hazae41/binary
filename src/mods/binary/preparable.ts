import { Bytes } from "@hazae41/bytes";
import { Result } from "@hazae41/result";
import { BinaryWriteUnderflowError, Writable } from "mods/binary/writable.js";

/**
 * A preparable binary data type
 */
export interface Preparable<Output extends Writable = Writable, Error = unknown> {

  /**
   * Prepare to a writable
   */
  tryPrepare(): Result<Output, Error>

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
  export function tryPrepareToBytes<PrepareError, SizeError, WriteError>(preparable: Preparable<Writable<SizeError, WriteError>, PrepareError>): Result<Bytes, PrepareError | SizeError | WriteError | BinaryWriteUnderflowError> {
    return preparable.tryPrepare().andThenSync(Writable.tryWriteToBytes)
  }

}