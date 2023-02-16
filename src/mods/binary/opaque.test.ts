import { test } from "@hazae41/phobos";
import { SafeOpaque } from "./opaque.js";
import { Readable } from "./readable.js";

test("Opaque", async ({ test }) => {
  const bytes = new Uint8Array([1, 2, 3, 4, 5])
  const opaque = Readable.fromBytes(SafeOpaque, bytes)

})