"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const escapeId = (str) => `"${String(str).replace(/(["])/gi, '$1$1')}"`;
exports.default = escapeId;
