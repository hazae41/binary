<div align="center">
<img src="https://user-images.githubusercontent.com/4405263/219944821-62f41f78-522b-4d10-92fb-923ae6c36602.png" />
</div>

```bash
npm i @hazae41/binary
```

[**Node Package 📦**](https://www.npmjs.com/package/@hazae41/binary)

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

  write(cursor: Cursor): Result<this, Error> {
    try {
      cursor.writeUint8(this.x).unwrap()
      cursor.writeUint16(this.y).unwrap()

      return Ok.void()
    } catch(e: unknown) {
      return new Err(e as Error)
    }
  }

}
```

```typescript
const myobject = new MyObject(1, 515)
const bytes = Writable.toBytes(myobject).unwrap() // Uint8Array([1, 2, 3])
```

#### Readable

```typescript
class MyObject {

  constructor(
    readonly x: number,
    readonly y: number
  ) {}

  static read(cursor: Cursor) {
    const x = cursor.readUint8()
    const y = cursor.readUint16()

    return new this(x, y)
  }

}
```

```typescript
const bytes = new Uint8Array([1, 2, 3])
const myobject = Readable.fromBytes(MyObject, bytes) // MyObject(1, 515)
```

#### Opaque

This is a binary data type that just holds bytes, it can be used when a binary data type is required

```typescript
const bytes = new Uint8Array([1, 2, 3])
const opaque = Readable.fromBytes(SafeOpaque, bytes) // Opaque(Uint8Array([1, 2, 3]))
const myobject = opaque.into(MyObject) // MyObject(1, 515)
```

```typescript
const myobject = new MyObject(1, 515)
const opaque = Opaque.from(myobject) // Opaque(Uint8Array([1, 2, 3]))
const bytes = Writable.toBytes(opaque) // Uint8Array([1, 2, 3])
```
