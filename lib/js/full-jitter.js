"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const randRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const fullJitter = (retries) => randRange(0, Math.min(100, 2 * 2 ** retries));
exports.default = fullJitter;
