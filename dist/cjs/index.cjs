'use strict';

var index = require('./mods/index.cjs');
var index$1 = require('./mods/binary/empty/index.cjs');
var index$2 = require('./mods/binary/opaque/index.cjs');
var index$4 = require('./mods/binary/readable/errors/index.cjs');
var index$3 = require('./mods/binary/readable/index.cjs');
var index$6 = require('./mods/binary/writable/errors/index.cjs');
var index$5 = require('./mods/binary/writable/index.cjs');



exports.Binary = index;
Object.defineProperty(exports, "Empty", {
	enumerable: true,
	get: function () { return index$1.Empty; }
});
Object.defineProperty(exports, "Opaque", {
	enumerable: true,
	get: function () { return index$2.Opaque; }
});
exports.ReadUnderflowError = index$4.ReadUnderflowError;
exports.ReadUnknownError = index$4.ReadUnknownError;
Object.defineProperty(exports, "Readable", {
	enumerable: true,
	get: function () { return index$3.Readable; }
});
exports.SizeUnknownError = index$6.SizeUnknownError;
exports.WriteUnderflowError = index$6.WriteUnderflowError;
exports.WriteUnknownError = index$6.WriteUnknownError;
Object.defineProperty(exports, "Writable", {
	enumerable: true,
	get: function () { return index$5.Writable; }
});
//# sourceMappingURL=index.cjs.map
