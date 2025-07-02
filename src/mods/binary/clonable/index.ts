/**
 * A clonable binary data type
 */
export interface Clonable {

  /**
   * Deep clone this object
   */
  cloneOrThrow(): this

}