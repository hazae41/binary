export class Binary {
  offset = 0

  readonly view: DataView

  /**
   * An object with a Buffer and an offset
   * @param buffer Buffer
   */
  constructor(
    public buffer: Buffer
  ) {
    this.view = new DataView(this.buffer.buffer)
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
    return this.buffer.length - this.offset
  }

  /**
   * Get a slice of the buffer before the current offset
   * @returns slice of the buffer before the current offset
   */
  get before() {
    return this.buffer.subarray(0, this.offset)
  }

  /**
   * Get a slice of the buffer after the current offset
   * @returns slice of the buffer after the current offset
   */
  get after() {
    return this.buffer.subarray(this.offset)
  }

  /**
   * Get a slice of the buffer
   * @param length 
   * @returns slice of the buffer
   */
  get(length: number) {
    if (this.offset + length > this.buffer.length)
      throw new Error(`offset is out of bounds`)
    return this.buffer.subarray(this.offset, this.offset + length)
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
    this.buffer.set(array, this.offset)
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
    return this.buffer.readUInt8(this.offset)
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
    this.buffer.writeUInt8(x, this.offset)
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
    return this.buffer.readUInt16BE(this.offset)
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
    this.buffer.writeUInt16BE(x, this.offset)
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
    return this.buffer.readUInt32BE(this.offset)
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
    this.buffer.writeUInt32BE(x, this.offset)
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
    return this.view.getBigUint64(this.offset)
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
    this.view.setBigUint64(this.offset, x)
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
    return this.get(length).toString(encoding)
  }

  /**
   * Read a fixed-length string
   * @param length byte length of the string
   * @param encoding encoding
   * @returns string
   */
  readString(length: number, encoding?: BufferEncoding) {
    return this.read(length).toString(encoding)
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

    while (i < this.buffer.length && this.buffer[i] > 0)
      i++
    if (i === this.buffer.length)
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
    return this.getNulled().toString(encoding)
  }

  /**
   * Read a NULL-terminated string
   * @param encoding encoding
   * @returns string
   */
  readNulledString(encoding?: BufferEncoding) {
    return this.readNulled().toString(encoding)
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
      chunks.push(this.read(Math.min(this.remaining, length)))
    return chunks
  }

  /**
   * @deprecated
   * @param end 
   */
  fill(end?: number) {
    this.buffer.fill(0, this.offset, end)
  }
}