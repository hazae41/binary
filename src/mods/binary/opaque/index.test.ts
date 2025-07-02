import { assert, test } from "@hazae41/phobos";
import { relative, resolve } from "node:path";
import { Readable } from "../readable/index.js";
import { Opaque } from "./index.js";

function equals(a: Uint8Array, b: Uint8Array) {
  return Buffer.from(a).equals(Buffer.from(b))
}

const directory = resolve("./dist/test/")
const { pathname } = new URL(import.meta.url)
console.log(relative(directory, pathname.replace(".mjs", ".ts")))

test("Opaque", async ({ test }) => {
  const bytes = new Uint8Array([1, 2, 3, 4, 5])

  const opaque = Readable.readFromBytesOrThrow(Opaque, bytes)
  const opaque2 = opaque.readIntoOrThrow(Opaque).cloneOrThrow()
  const opaque3 = Opaque.writeFromOrThrow(opaque2)

  assert(equals(opaque.bytes, opaque2.bytes))
  assert(equals(opaque2.bytes, opaque3.bytes))
})