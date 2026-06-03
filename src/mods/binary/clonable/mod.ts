// deno-lint-ignore-file no-namespace

/**
 * A clonable binary data type
 */
export interface Clonable<Output = unknown> {

  /**
   * Deep clone this object
   */
  clone(): Output

}

export namespace Clonable {

  export type Output<Self> = Self extends Clonable<infer Output> ? Output : never

}