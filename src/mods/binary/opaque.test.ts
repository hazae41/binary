import { Bytes } from "@hazae41/bytes";
import { assert, test } from "@hazae41/phobos";
import { relative, resolve } from "node:path";
import { Opaque, SafeOpaque, UnsafeOpaque } from "./opaque.js";
import { Readable } from "./readable.js";

const directory = resolve("./dist/test/")
const { pathname } = new URL(import.meta.url)
console.log(relative(directory, pathname.replace(".mjs", ".ts")))

test("Opaque", async ({ test }) => {
  const bytes = new Uint8Array([1, 2, 3, 4, 5])

  const opaque = Readable.fromBytes(SafeOpaque, bytes)
  const opaque2 = opaque.into(UnsafeOpaque)
  const opaque3 = Opaque.from(opaque2)

  assert(Bytes.equals(opaque.bytes, opaque2.bytes))
  assert(Bytes.equals(opaque2.bytes, opaque3.bytes))
})