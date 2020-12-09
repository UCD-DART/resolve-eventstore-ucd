"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.result = exports.Client = void 0;
const result = [];
exports.result = result;
const Client = jest.fn(function () {
  this.connect = jest.fn(() => Promise.resolve());
  this.query = jest.fn(() =>
    Promise.resolve({
      rows: result,
    })
  );
  this.end = jest.fn(() => Promise.resolve());
});
exports.Client = Client;
//# sourceMappingURL=pg.js.map
