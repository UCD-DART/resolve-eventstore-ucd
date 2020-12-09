"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const shapeEvent = (event, additionalFields) => Object.freeze({
  threadCounter: +event.threadCounter,
  threadId: +event.threadId,
  type: event.type,
  timestamp: +event.timestamp,
  aggregateId: event.aggregateId,
  aggregateVersion: +event.aggregateVersion,
  payload: event.payload,
  ...additionalFields
});

var _default = shapeEvent;
exports.default = _default;
//# sourceMappingURL=shape-event.js.map