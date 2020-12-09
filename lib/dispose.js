"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var _getLog = _interopRequireDefault(require("./js/get-log"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const dispose = async () => {
  const log = (0, _getLog.default)(`dispose`);
  log.debug(`disposing the adapter`);
};

var _default = dispose;
exports.default = _default;
//# sourceMappingURL=dispose.js.map
