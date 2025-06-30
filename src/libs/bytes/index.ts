export type Uint8Array<N extends number = number> = number extends N
  ? globalThis.Uint8Array
  : globalThis.Uint8Array & { readonly length: N }