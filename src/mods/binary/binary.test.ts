import { assert, test } from "@hazae41/phobos";
import { Binary } from "mods/binary/binary.js";
import { relative, resolve } from "node:path";

const directory = resolve("./dist/test/")
const { pathname } = new URL(import.meta.url)
console.log(relative(directory, pathname.replace(".cjs", ".ts")))

test("From view", async () => {
  const view = new Uint32Array([12345, 54321])
  const binary = new Binary(view, 120)
})

test("Allocation", async () => {
  for (let i = 0; i < 32; i++) {
    const binary = Binary.alloc(i)
    assert(binary.bytes.length === i)
    assert(binary.offset === 0)
  }

  for (let i = 0; i < 32; i++) {
    const binary = Binary.allocUnsafe(i)
    assert(binary.bytes.length === i)
    assert(binary.offset === 0)
  }
})

test("write then read", async () => {
  const buffer = Buffer.from([1, 2, 3, 4])
  const binary = Binary.allocUnsafe(buffer.length)

  binary.write(buffer)
  assert(binary.offset === buffer.length)
  assert(binary.buffer.equals(buffer))

  binary.offset = 0

  const buffer2 = binary.read(buffer.length)
  assert(binary.offset === buffer.length)
  assert(binary.buffer.equals(buffer2))

  assert(buffer.length === buffer2.length)
  assert(buffer.equals(buffer2))
})

// test("out of bound write then read", async () => {
//   return

//   const buffer = Buffer.from([1, 2, 3, 4, 5])
//   const binary = Binary.allocUnsafe(4)

//   assert(throws(() => binary.write(buffer)))
//   assert(throws(() => binary.read(buffer.length)))
// })

test("writeUint8 then readUint8", async () => {
  const binary = Binary.allocUnsafe(1)

  const n = 42

  binary.writeUint8(n)
  assert(binary.offset === 1)
  assert(binary.bytes.length === 1)
  assert(binary.buffer.equals(Buffer.from([n])))

  binary.offset = 0

  const n2 = binary.readUint8()
  assert(binary.offset === 1)
  assert(binary.bytes.length === 1)
  assert(binary.buffer.equals(Buffer.from([n])))

  assert(n === n2)

  binary.offset = 0

  // assert(throws(() => binary.writeUint8(2 ** 8)))
  // assert(throws(() => binary.writeUint8(-1)))
})

test("writeUint16 then readUint16", async () => {
  const binary = Binary.allocUnsafe(2)

  const n = 42

  binary.writeUint16(n)
  assert(binary.offset === 2)
  assert(binary.bytes.length === 2)

  binary.offset = 0

  const n2 = binary.readUint16()
  assert(binary.offset === 2)
  assert(binary.bytes.length === 2)

  assert(n === n2)

  binary.offset = 0

  // assert(throws(() => binary.writeUint16(2 ** 16)))
  // assert(throws(() => binary.writeUint16(-1)))
})

test("writeUint24 then readUint24", async () => {
  const binary = Binary.allocUnsafe(3)

  const n = 42

  binary.writeUint24(n)
  assert(binary.offset === 3)
  assert(binary.bytes.length === 3)

  binary.offset = 0

  const n2 = binary.readUint24()
  assert(binary.offset === 3)
  assert(binary.bytes.length === 3)

  assert(n === n2)

  binary.offset = 0

  // assert(throws(() => binary.writeUint16(2 ** 24)))
  // assert(throws(() => binary.writeUint16(-1)))
})

test("writeUint32 then readUint32", async () => {
  const binary = Binary.allocUnsafe(4)

  const n = 42

  binary.writeUint32(n)
  assert(binary.offset === 4)
  assert(binary.bytes.length === 4)

  binary.offset = 0

  const n2 = binary.readUint32()
  assert(binary.offset === 4)
  assert(binary.bytes.length === 4)

  assert(n === n2)

  binary.offset = 0

  // assert(throws(() => binary.writeUint16(2 ** 32)))
  // assert(throws(() => binary.writeUint16(-1)))
})
