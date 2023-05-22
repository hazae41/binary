import { Bytes } from "@hazae41/bytes";
import { assert, test } from "@hazae41/phobos";
import { Debug } from "@hazae41/result";
import { relative, resolve } from "node:path";
import { Opaque, SafeOpaque, UnsafeOpaque } from "./opaque.js";
import { Readable } from "./readable.js";

const directory = resolve("./dist/test/")
const { pathname } = new URL(import.meta.url)
console.log(relative(directory, pathname.replace(".mjs", ".ts")))

Debug.debug = true

test("Opaque", async ({ test }) => {
  const bytes = new Uint8Array([1, 2, 3, 4, 5])

  const opaque = Readable.tryReadFromBytes(SafeOpaque, bytes).unwrap()
  const opaque2 = opaque.tryInto(UnsafeOpaque).unwrap()
  const opaque3 = Opaque.tryFrom(opaque2).unwrap()

  assert(Bytes.equals(opaque.bytes, opaque2.bytes))
  assert(Bytes.equals(opaque2.bytes, opaque3.bytes))
})