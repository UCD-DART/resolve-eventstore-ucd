"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const escape = (str) => `'${String(str).replace(/(['])/gi, '$1$1')}'`;
exports.default = escape;
