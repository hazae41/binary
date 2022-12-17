<div align="center">
<img width="500" src="https://user-images.githubusercontent.com/4405263/207937118-2a3e47f4-c291-4186-a1bc-69a9638fedd3.png" />
</div>
<h3 align="center">
Zero-copy Buffer reader and writer 🏎️
</h3>

```bash
npm i @hazae41/binary
```

[**Node Package 📦**](https://www.npmjs.com/package/@hazae41/binary)

### Current features
- 100% TypeScript and ESM
- Zero-copy reading and writing
- No external dependency
- Unit tested

### Usage

```typescript
const binary = Binary.alloc(3)
```

```typescript
const binary = Binary.allocUnsafe(3)
```

```typescript
const binary = new Binary(Buffer.from([0x1, 0x2]))
```

```typescript
binary.writeUint8(123)
binary.writeUint16(1234)
```
