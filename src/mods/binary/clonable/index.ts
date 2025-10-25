/**
 * A clonable binary data type
 */
export interface Clonable<T> {

  /**
   * Deep clone this object
   */
  cloneOrThrow(): T

}