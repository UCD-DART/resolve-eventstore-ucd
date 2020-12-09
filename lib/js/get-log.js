"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var _resolveDebugLevels = _interopRequireDefault(
  require("resolve-debug-levels")
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _default = (scope) =>
  (0, _resolveDebugLevels.default)(`resolve:event-store-postgres:${scope}`);

exports.default = _default;
//# sourceMappingURL=get-log.js.map
