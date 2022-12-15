<div align="center">
<img width="500" src="https://user-images.githubusercontent.com/4405263/207935460-d3462bb8-886d-449d-84c9-3d7eaedbc87f.png" />
<h3 align="center">Zero-copy Buffer reader and writer 🏎️</h3>
</div>

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
