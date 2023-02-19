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
- Unit-tested
- Zero-copy reading and writing

## Usage

### Cursor

#### Writing

```typescript
const cursor = Cursor.allocUnsafe(1024)

cursor.writeUint8(123)
cursor.writeUint16(1234)

console.log(cursor.offset) // 3
```

#### Reading

```typescript
const bytes = new Uint8Array(/*...*/)
const cursor = new Cursor(bytes)

const uint8 = cursor.readUint8()
const uint16 = cursor.readUint16()

console.log(cursor.offset) // 3
```

### Binary data types

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
const bytes = Writable.toBytes(myobject) // Uint8Array([1, 2, 3])
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
