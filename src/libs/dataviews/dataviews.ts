export namespace DataViews {

  export function fromView(view: ArrayBufferView) {
    return new DataView(view.buffer, view.byteOffset, view.byteLength)
  }

}