import { test, assert } from '@hazae41/phobos';
import { resolve, relative } from 'node:path';
import { Readable } from '../readable/index.mjs';
import { Opaque } from './index.mjs';

function equals(a, b) {
    return Buffer.from(a).equals(Buffer.from(b));
}
const directory = resolve("./dist/test/");
const { pathname } = new URL(import.meta.url);
console.log(relative(directory, pathname.replace(".mjs", ".ts")));
test("Opaque", async ({ test }) => {
    const bytes = new Uint8Array([1, 2, 3, 4, 5]);
    const opaque = Readable.readFromBytesOrThrow(Opaque, bytes);
    const opaque2 = opaque.readIntoOrThrow(Opaque).cloneOrThrow();
    const opaque3 = Opaque.writeFromOrThrow(opaque2);
    assert(equals(opaque.bytes, opaque2.bytes));
    assert(equals(opaque2.bytes, opaque3.bytes));
});
//# sourceMappingURL=index.test.mjs.map
