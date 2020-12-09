"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const coercer = ({
  intValue,
  stringValue,
  bigIntValue,
  longValue,
  booleanValue,
  ...rest
}) => {
  if (intValue != null) {
    return Number(intValue);
  } else if (bigIntValue != null) {
    return Number(bigIntValue);
  } else if (longValue != null) {
    return Number(longValue);
  } else if (stringValue != null) {
    return String(stringValue);
  } else if (booleanValue != null) {
    return Boolean(booleanValue);
  } else {
    throw new Error(`Unknown type ${JSON.stringify(rest)}`);
  }
};

var _default = coercer;
exports.default = _default;
//# sourceMappingURL=coercer.js.map