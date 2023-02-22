import { Writable } from "mods/binary/writable.js";

/**
 * A preparable binary data type
 */
export interface Preparable<T extends Writable> {

  /**
   * Prepare to a writable
   */
  prepare(): T

}

export namespace Preparable {

  /**
    * Write a binary data type to bytes
    * @param writable 
    * @returns 
    */
  export function toBytes(preparable: Preparable<Writable>) {
    return Writable.toBytes(preparable.prepare())
  }

}