"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shapeEvent = (event, additionalFields) => Object.freeze({
    threadCounter: +event.threadCounter,
    threadId: +event.threadId,
    type: event.type,
    timestamp: +event.timestamp,
    aggregateId: event.aggregateId,
    aggregateVersion: +event.aggregateVersion,
    payload: event.payload,
    ...additionalFields,
});
exports.default = shapeEvent;
