# Binary

Zero-copy binary data types for the web

```bash
npm install @hazae41/binary
```

[**📦 NPM**](https://www.npmjs.com/package/@hazae41/binary)

## Features

### Current features
- 100% TypeScript and ESM
- No external dependencies
- Zero-copy reading and writing
- Rust-like patterns
- Unit-tested

## Usage

#### Writable

```typescript
class MyObject implements Writable {

  constructor(
    readonly x: number,
    readonly y: number
  ) {}

  size() {
    return 1 + 2
  }

  write(cursor: Cursor) {
    cursor.writeUint8(this.x)
    cursor.writeUint16(this.y)
  }

}
```

```typescript
const myobject = new MyObject(1, 515)
const bytes = Writable.writeToBytes(myobject) // Uint8Array([1, 2, 3])
```

#### Readable

```typescript
class MyObject {

  constructor(
    readonly x: number,
    readonly y: number
  ) {}

  static read(cursor: Cursor): MyObject {
    const x = cursor.readUint8()
    const y = cursor.readUint16()

    return new MyObject(x, y)
  }

}
```

```typescript
const bytes = new Uint8Array([1, 2, 3])
const myobject = Readable.readFromBytes(MyObject, bytes) // MyObject(1, 515)
```

#### Opaque

This is a binary data type that just holds bytes, it can be used when a binary data type is required

```typescript
const bytes = new Uint8Array([1, 2, 3])
const opaque = Readable.readFromBytes(Opaque.Uncopied, bytes) // Opaque(Uint8Array([1, 2, 3]))
const myobject = opaque.readInto(MyObject) // MyObject(1, 515)
```

```typescript
const myobject = new MyObject(1, 515)
const opaque = Opaque.writeFrom(myobject) // Opaque.Copied(Uint8Array([1, 2, 3]))
const bytes = Writable.writeToBytes(opaque) // Uint8Array([1, 2, 3])
```
