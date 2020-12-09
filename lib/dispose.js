"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_log_1 = __importDefault(require("./js/get-log"));
const dispose = async () => {
    const log = get_log_1.default(`dispose`);
    log.debug(`disposing the adapter`);
};
exports.default = dispose;
