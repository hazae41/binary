import { Bytes } from "@hazae41/bytes"
import { Buffers } from "libs/buffers/buffers.js"
import { DataViews } from "libs/dataviews/dataviews.js"

export class Cursor<T extends ArrayBufferView = ArrayBufferView> {
  readonly #class = Cursor

  #view: T

  #bytes: Uint8Array
  #data: DataView
  #buffer: Buffer

  offset: number

  /**
   * A cursor for bytes
   * @param view 
   * @param offset 
   */
  constructor(view: T, offset = 0) {
    this.#view = view

    this.#bytes = Bytes.fromView(view)
    this.#data = DataViews.fromView(view)
    this.#buffer = Buffers.fromView(view)

    this.offset = offset
  }

  get view() {
    return this.#view
  }

  set view(view: T) {
    this.#view = view

    this.#bytes = Bytes.fromView(view)
    this.#data = DataViews.fromView(view)
    this.#buffer = Buffers.fromView(view)
  }

  get bytes() {
    return this.#bytes
  }

  get data() {
    return this.#data
  }

  get buffer() {
    return this.#buffer
  }

  /**
   * Create a new Binary using Buffer.alloc
   * @param length 
   * @returns Binary
   */
  static alloc(length: number) {
    return new this(Bytes.alloc(length))
  }

  /**
   * Create a new Binary using Buffer.allocUnsafe
   * @param length 
   * @returns Binary
   */
  static allocUnsafe(length: number) {
    return new this(Bytes.allocUnsafe(length))
  }

  /**
   * Create a new Binary with random bytes
   * @param length 
   * @returns Binary
   */
  static random(length: number) {
    return new this(Bytes.random(length))
  }

  /**
   * @returns total number of bytes
   */
  get length() {
    return this.bytes.length
  }

  /**
   * @returns number of remaining bytes
   */
  get remaining() {
    return this.length - this.offset
  }

  /**
   * Get a subarray of the bytes before the current offset
   * @returns subarray of the bytes before the current offset
   */
  get before() {
    return this.bytes.subarray(0, this.offset)
  }

  /**
   * Get a subarray of the bytes after the current offset
   * @returns subarray of the bytes after the current offset
   */
  get after() {
    return this.bytes.subarray(this.offset)
  }

  /**
   * Get a subarray of the bytes
   * @param length 
   * @returns subarray of the bytes
   */
  get(length: number) {
    if (this.remaining < length)
      throw new Error(`${this.#class.name}.get() overflow`)

    return this.bytes.subarray(this.offset, this.offset + length)
  }

  /**
   * Read a subarray of the bytes
   * @param length 
   * @param shallow 
   * @returns subarray of the bytes
   */
  read(length: number) {
    const subarray = this.get(length)
    this.offset += length
    return subarray
  }

  /**
   * Set an array to the bytes
   * @param array array
   */
  set(array: Uint8Array) {
    if (this.remaining < array.length)
      throw new Error(`${this.#class.name}.set() overflow`)

    this.bytes.set(array, this.offset)
  }

  /**
   * Write an array to the bytes
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
    return this.data.getUint8(this.offset)
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
    this.data.setUint8(this.offset, x)
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
  getUint16(littleEndian?: boolean) {
    return this.data.getUint16(this.offset, littleEndian)
  }

  /**
   * Read a 16-bits unsigned number
   * @returns 16-bits unsigned number
   */
  readUint16(littleEndian?: boolean) {
    const x = this.getUint16(littleEndian)
    this.offset += 2
    return x
  }

  /**
   * Set a 16-bits unsigned number
   * @param x 16-bits unsigned number
   */
  setUint16(x: number, littleEndian?: boolean) {
    this.data.setUint16(this.offset, x, littleEndian)
  }

  /**
   * Write a 16-bits unsigned number
   * @param x 16-bits unsigned number
   */
  writeUint16(x: number, littleEndian?: boolean) {
    this.setUint16(x, littleEndian)
    this.offset += 2
  }

  /**
   * Get a 24-bits unsigned number
   * @returns 24-bits unsigned number
   */
  getUint24(littleEndian?: boolean) {
    if (littleEndian)
      return this.buffer.readUIntLE(this.offset, 3)
    else
      return this.buffer.readUIntBE(this.offset, 3)
  }

  /**
   * Read a 24-bits unsigned number
   * @returns 24-bits unsigned number
   */
  readUint24(littleEndian?: boolean) {
    const x = this.getUint24(littleEndian)
    this.offset += 3
    return x
  }

  /**
   * Set a 24-bits unsigned number
   * @param x 24-bits unsigned number
   */
  setUint24(x: number, littleEndian?: boolean) {
    if (littleEndian)
      this.buffer.writeUIntLE(x, this.offset, 3)
    else
      this.buffer.writeUIntBE(x, this.offset, 3)
  }

  /**
   * Write a 24-bits unsigned number
   * @param x 24-bits unsigned number
   */
  writeUint24(x: number, littleEndian?: boolean) {
    this.setUint24(x, littleEndian)
    this.offset += 3
  }

  /**
   * Get a 32-bits unsigned number
   * @returns 32-bits unsigned number
   */
  getUint32(littleEndian?: boolean) {
    return this.data.getUint32(this.offset, littleEndian)
  }

  /**
   * Read a 32-bits unsigned number
   * @returns 32-bits unsigned number
   */
  readUint32(littleEndian?: boolean) {
    const x = this.getUint32(littleEndian)
    this.offset += 4
    return x
  }

  /**
   * Set a 32-bits unsigned number
   * @param x 32-bits unsigned number
   */
  setUint32(x: number, littleEndian?: boolean) {
    this.data.setUint32(this.offset, x, littleEndian)
  }

  /**
   * Write a 32-bits unsigned number
   * @param x 32-bits unsigned number
   */
  writeUint32(x: number, littleEndian?: boolean) {
    this.setUint32(x, littleEndian)
    this.offset += 4
  }

  /**
   * Get a 64-bits unsigned number
   * @returns 64-bits unsigned number
   */
  getUint64(littleEndian?: boolean) {
    return this.data.getBigUint64(this.offset, littleEndian)
  }

  /**
   * Read a 64-bits unsigned number
   * @returns 64-bits unsigned number
   */
  readUint64(littleEndian?: boolean) {
    const x = this.getUint64(littleEndian)
    this.offset += 8
    return x
  }

  /**
   * Set a 64-bits unsigned number
   * @param x 64-bits unsigned number
   */
  setUint64(x: bigint, littleEndian?: boolean) {
    this.data.setBigUint64(this.offset, x, littleEndian)
  }

  /**
   * Write a 64-bits unsigned number
   * @param x 64-bits unsigned number
   */
  writeUint64(x: bigint, littleEndian?: boolean) {
    this.setUint64(x, littleEndian)
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

    while (i < this.bytes.length && this.bytes[i] > 0)
      i++
    if (i === this.bytes.length)
      throw new Error(`Out of bounds NULL`)
    return i
  }

  /**
   * Get a NULL-terminated subarray
   * @returns subarray of the bytes
   */
  getNulled() {
    return this.get(this.null)
  }

  /**
   * Read a NULL-terminated subarray
   * @returns subarray of the bytes
   */
  readNulled() {
    const subarray = this.read(this.null)
    this.offset += subarray.length
    return subarray
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
   * Fill length bytes with value after offset
   * @param value value to fill
   * @param length length to fill
   */
  fill(value: number, length: number) {
    this.bytes.fill(value, this.offset, this.offset + length)
    this.offset += length
  }

  /**
   * Split into chunks of maximum length bytes
   * @param length 
   * @returns 
   */
  *split(length: number) {
    while (this.remaining >= length)
      yield this.read(length)
    if (this.remaining)
      yield this.read(this.remaining)
  }

}