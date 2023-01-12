import { Buffers } from "libs/buffers/buffers.js"
import { Bytes } from "libs/bytes/bytes.js"
import { DataViews } from "libs/dataviews/dataviews.js"

export class Binary<T extends ArrayBufferView = ArrayBufferView> {
  private _view: T

  private _bytes: Uint8Array
  private _data: DataView
  private _buffer: Buffer

  public offset: number

  /**
   * An object with bytes and an offset
   * @param bytes Buffer
   */
  constructor(view: T, offset = 0) {
    this._view = view

    this._bytes = Bytes.fromView(view)
    this._data = DataViews.fromView(view)
    this._buffer = Buffers.fromView(view)

    this.offset = offset
  }

  get view() {
    return this._view
  }

  set view(view: T) {
    this._view = view

    this._bytes = Bytes.fromView(view)
    this._data = DataViews.fromView(view)
    this._buffer = Buffers.fromView(view)
  }

  get bytes() {
    return this._bytes
  }

  get data() {
    return this._data
  }

  get buffer() {
    return this._buffer
  }

  /**
   * Create a new Binary using Buffer.alloc
   * @param length 
   * @returns Binary
   */
  static alloc(length: number) {
    return new Binary(Buffer.alloc(length))
  }

  /**
   * Create a new Binary using Buffer.allocUnsafe
   * @param length 
   * @returns Binary
   */
  static allocUnsafe(length: number) {
    return new Binary(Buffer.allocUnsafe(length))
  }

  /**
   * @returns number of remaining bytes
   */
  get remaining() {
    return this._bytes.length - this.offset
  }

  /**
   * Get a slice of the buffer before the current offset
   * @returns slice of the buffer before the current offset
   */
  get before() {
    return this._bytes.subarray(0, this.offset)
  }

  /**
   * Get a slice of the buffer after the current offset
   * @returns slice of the buffer after the current offset
   */
  get after() {
    return this._bytes.subarray(this.offset)
  }

  /**
   * Get a slice of the buffer
   * @param length 
   * @returns slice of the buffer
   */
  get(length: number) {
    return this._bytes.subarray(this.offset, this.offset + length)
  }

  /**
   * Read a slice of the buffer
   * @param length 
   * @param shallow 
   * @returns slice of the buffer
   */
  read(length: number) {
    const slice = this.get(length)
    this.offset += length
    return slice
  }

  /**
   * Set an array to the buffer
   * @param array array
   */
  set(array: Uint8Array) {
    this._bytes.set(array, this.offset)
  }

  /**
   * Write an array to the buffer
   * @param array array
   */
  write(array: Uint8Array) {
    this.set(array)
    this.offset += array.length
  }

  /**
   * Get a 8-bits unsigned number
   * @returns 8-bits unsigned number
   */
  getUint8() {
    return this._data.getUint8(this.offset)
  }

  /**
   * Read a 8-bits unsigned number
   * @returns 8-bits unsigned number
   */
  readUint8() {
    const x = this.getUint8()
    this.offset++
    return x
  }

  /**
   * Set a 8-bits unsigned number
   * @param x 8-bits unsigned number
   */
  setUint8(x: number) {
    this._data.setUint8(this.offset, x)
  }

  /**
   * Write a 8-bits unsigned number
   * @param x 8-bits unsigned number
   */
  writeUint8(x: number) {
    this.setUint8(x)
    this.offset++
  }

  /**
   * Get a 16-bits unsigned number
   * @returns 16-bits unsigned number
   */
  getUint16() {
    return this._data.getUint16(this.offset)
  }

  /**
   * Read a 16-bits unsigned number
   * @returns 16-bits unsigned number
   */
  readUint16() {
    const x = this.getUint16()
    this.offset += 2
    return x
  }

  /**
   * Set a 16-bits unsigned number
   * @param x 16-bits unsigned number
   */
  setUint16(x: number) {
    this._data.setUint16(this.offset, x)
  }

  /**
   * Write a 16-bits unsigned number
   * @param x 16-bits unsigned number
   */
  writeUint16(x: number) {
    this.setUint16(x)
    this.offset += 2
  }

  /**
   * Get a 24-bits unsigned number
   * @returns 24-bits unsigned number
   */
  getUint24() {
    return this.buffer.readUIntBE(this.offset, 3)
  }

  /**
   * Read a 24-bits unsigned number
   * @returns 24-bits unsigned number
   */
  readUint24() {
    const x = this.getUint24()
    this.offset += 3
    return x
  }

  /**
   * Set a 24-bits unsigned number
   * @param x 24-bits unsigned number
   */
  setUint24(x: number) {
    this.buffer.writeUIntBE(x, this.offset, 3)
  }

  /**
   * Write a 24-bits unsigned number
   * @param x 24-bits unsigned number
   */
  writeUint24(x: number) {
    this.setUint24(x)
    this.offset += 3
  }

  /**
   * Get a 32-bits unsigned number
   * @returns 32-bits unsigned number
   */
  getUint32() {
    return this._data.getUint32(this.offset)
  }

  /**
   * Read a 32-bits unsigned number
   * @returns 32-bits unsigned number
   */
  readUint32() {
    const x = this.getUint32()
    this.offset += 4
    return x
  }

  /**
   * Set a 32-bits unsigned number
   * @param x 32-bits unsigned number
   */
  setUint32(x: number) {
    this._data.setUint32(this.offset, x)
  }

  /**
   * Write a 32-bits unsigned number
   * @param x 32-bits unsigned number
   */
  writeUint32(x: number) {
    this.setUint32(x)
    this.offset += 4
  }

  /**
   * Get a 64-bits unsigned number
   * @returns 64-bits unsigned number
   */
  getUint64() {
    return this._data.getBigUint64(this.offset)
  }

  /**
   * Read a 64-bits unsigned number
   * @returns 64-bits unsigned number
   */
  readUint64() {
    const x = this.getUint64()
    this.offset += 8
    return x
  }

  /**
   * Set a 64-bits unsigned number
   * @param x 64-bits unsigned number
   */
  setUint64(x: bigint) {
    this._data.setBigUint64(this.offset, x)
  }

  /**
   * Write a 64-bits unsigned number
   * @param x 64-bits unsigned number
   */
  writeUint64(x: bigint) {
    this.setUint64(x)
    this.offset += 8
  }

  /**
   * Get a fixed-length string
   * @param length byte length of the string
   * @param encoding encoding
   * @returns string
   */
  getString(length: number, encoding?: BufferEncoding) {
    return Buffers.fromView(this.get(length)).toString(encoding)
  }

  /**
   * Read a fixed-length string
   * @param length byte length of the string
   * @param encoding encoding
   * @returns string
   */
  readString(length: number, encoding?: BufferEncoding) {
    return Buffers.fromView(this.read(length)).toString(encoding)
  }

  /**
   * Set a fixed-length string
   * @param text string
   * @param encoding encoding
   */
  setString(text: string, encoding?: BufferEncoding) {
    this.set(Buffer.from(text, encoding))
  }

  /**
   * Write a fixed-length string
   * @param text string
   * @param encoding encoding
   */
  writeString(text: string, encoding?: BufferEncoding) {
    this.write(Buffer.from(text, encoding))
  }

  /**
   * Get the first NULL (byte 0) index relative to the current offset
   */
  get null() {
    let i = this.offset

    while (i < this._bytes.length && this._bytes[i] > 0)
      i++
    if (i === this._bytes.length)
      throw new Error(`Out of bounds NULL`)
    return i
  }

  /**
   * Get a NULL-terminated slice
   * @returns slice of the buffer
   */
  getNulled() {
    return this.get(this.null)
  }

  /**
   * Read a NULL-terminated slice
   * @returns slice of the buffer
   */
  readNulled() {
    const slice = this.read(this.null)
    this.offset += slice.length
    return slice
  }

  /**
   * Set a NULL-terminated array
   * @param array array
   */
  setNulled(array: Buffer) {
    const start = this.offset
    this.writeNulled(array)
    this.offset = start
  }

  /**
   * Write a NULL-terminated array
   * @param array array
   */
  writeNulled(array: Buffer) {
    this.write(array)
    this.writeUint8(0)
  }

  /**
   * Get a NULL-terminated string
   * @param encoding encoding
   * @returns string
   */
  getNulledString(encoding?: BufferEncoding) {
    return Buffers.fromView(this.getNulled()).toString(encoding)
  }

  /**
   * Read a NULL-terminated string
   * @param encoding encoding
   * @returns string
   */
  readNulledString(encoding?: BufferEncoding) {
    return Buffers.fromView(this.readNulled()).toString(encoding)
  }

  /**
   * Set a NULL-terminated string
   * @param text string
   * @param encoding encoding
   */
  setNulledString(text: string, encoding?: BufferEncoding) {
    this.setNulled(Buffer.from(text, encoding))
  }

  /**
   * Write a NULL-terminated string
   * @param text string
   * @param encoding encoding
   */
  writeNulledString(text: string, encoding?: BufferEncoding) {
    this.writeNulled(Buffer.from(text, encoding))
  }

  /**
   * @deprecated
   * @param offset 
   * @returns 
   */
  reread(offset: number) {
    const head = this.offset
    this.offset = offset
    return this.read(head - offset)
  }

  /**
   * @deprecated
   * @param length 
   * @returns 
   */
  split(length: number) {
    const chunks = new Array<Buffer>()

    while (this.remaining)
      chunks.push(Buffers.fromView(this.read(Math.min(this.remaining, length))))
    return chunks
  }

  /**
   * @deprecated
   * @param end 
   */
  fill(end?: number) {
    this._bytes.fill(0, this.offset, end)
  }
}