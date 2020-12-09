"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    info: jest.fn(),
    debug: jest.fn(),
    verbose: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    fatal: jest.fn(),
});
