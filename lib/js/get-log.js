"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolve_debug_levels_1 = __importDefault(require("resolve-debug-levels"));
exports.default = (scope) => resolve_debug_levels_1.default(`resolve:event-store-postgres:${scope}`);
