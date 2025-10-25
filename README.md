<div align="center">
<img src="https://user-images.githubusercontent.com/4405263/219944821-62f41f78-522b-4d10-92fb-923ae6c36602.png" />
</div>

```bash
npm install @hazae41/binary
```

```bash
deno install jsr:@hazae41/binary
```

[**📦 NPM**](https://www.npmjs.com/package/@hazae41/binary) • [**📦 JSR**](https://jsr.io/@hazae41/binary)

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

  sizeOrThrow() {
    return 1 + 2
  }

  writeOrThrow(cursor: Cursor) {
    cursor.writeUint8OrThrow(this.x)
    cursor.writeUint16OrThrow(this.y)
  }

}
```

```typescript
const myobject = new MyObject(1, 515)
const bytes = Writable.writeToBytesOrThrow(myobject) // Uint8Array([1, 2, 3])
```

#### Readable

```typescript
class MyObject {

  constructor(
    readonly x: number,
    readonly y: number
  ) {}

  static readOrThrow(cursor: Cursor): MyObject {
    const x = cursor.readUint8OrThrow()
    const y = cursor.readUint16OrThrow()

    return new MyObject(x, y)
  }

}
```

```typescript
const bytes = new Uint8Array([1, 2, 3])
const myobject = Readable.readFromBytesOrThrow(MyObject, bytes) // MyObject(1, 515)
```

#### Opaque

This is a binary data type that just holds bytes, it can be used when a binary data type is required

```typescript
const bytes = new Uint8Array([1, 2, 3])
const opaque = Readable.readFromBytesOrThrow(Opaque.Uncopied, bytes) // Opaque(Uint8Array([1, 2, 3]))
const myobject = opaque.readIntoOrThrow(MyObject) // MyObject(1, 515)
```

```typescript
const myobject = new MyObject(1, 515)
const opaque = Opaque.writeFromOrThrow(myobject) // Opaque.Copied(Uint8Array([1, 2, 3]))
const bytes = Writable.writeToBytesOrThrow(opaque) // Uint8Array([1, 2, 3])
```
