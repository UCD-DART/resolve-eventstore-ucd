"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const escape = str => `'${String(str).replace(/(['])/gi, '$1$1')}'`;

var _default = escape;
exports.default = _default;
//# sourceMappingURL=escape.js.map