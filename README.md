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

  write(cursor: Cursor): Result<void, Error> {
    return Result.unthrowSync<void, Error>(() => {
      cursor.tryWriteUint8(this.x).throw()
      cursor.tryWriteUint16(this.y).throw()

      return Ok.void()
    })
  }

}
```

```typescript
const myobject = new MyObject(1, 515)
const bytes = Writable.tryWriteToBytes(myobject).unwrap() // Uint8Array([1, 2, 3])
```

#### Readable

```typescript
class MyObject {

  constructor(
    readonly x: number,
    readonly y: number
  ) {}

  static read(cursor: Cursor): Result<MyObject, Error> {
    return Result.unthrowSync<MyObject, Error>(() => {
      const x = cursor.tryReadUint8().throw()
      const y = cursor.tryReadUint16().throw()

      return new Ok(new this(x, y))
    }, Error)
  }

}
```

```typescript
const bytes = new Uint8Array([1, 2, 3])
const myobject = Readable.tryReadFromBytes(MyObject, bytes).unwrap() // MyObject(1, 515)
```

#### Opaque

This is a binary data type that just holds bytes, it can be used when a binary data type is required

```typescript
const bytes = new Uint8Array([1, 2, 3])
const opaque = Readable.tryReadFromBytes(SafeOpaque, bytes).unwrap() // Opaque(Uint8Array([1, 2, 3]))
const myobject = opaque.tryInto(MyObject).unwrap() // MyObject(1, 515)
```

```typescript
const myobject = new MyObject(1, 515)
const opaque = Opaque.tryFrom(myobject).unwrap() // Opaque(Uint8Array([1, 2, 3]))
const bytes = Writable.tryWriteToBytes(opaque).unwrap() // Uint8Array([1, 2, 3])
```
