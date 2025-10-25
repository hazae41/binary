/**
 * A clonable binary data type
 */
export interface Clonable<Output = unknown> {

  /**
   * Deep clone this object
   */
  cloneOrThrow(): Output

}

export namespace Clonable {

  export type Output<T extends Clonable> = T extends Clonable<infer O> ? O : never

}