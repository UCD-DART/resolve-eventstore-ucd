"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

const escapeId = (str) => `"${String(str).replace(/(["])/gi, "$1$1")}"`;

var _default = escapeId;
exports.default = _default;
//# sourceMappingURL=escape-id.js.map
