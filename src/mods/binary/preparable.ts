import { Writable } from "mods/binary/writable.js";

/**
 * A preparable binary data type
 */
export interface Preparable {

  /**
   * Prepare to a writable
   */
  prepare(): Writable

}

export namespace Preparable {

  /**
    * Write a binary data type to bytes
    * @param writable 
    * @returns 
    */
  export function toBytes(preparable: Preparable) {
    return Writable.toBytes(preparable.prepare())
  }

}