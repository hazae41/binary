<p align="center">
<img width="500"
src="https://user-images.githubusercontent.com/4405263/207909347-96122c2f-a85f-4c64-9e6d-d2f4166f93c9.png" />
</p>

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
