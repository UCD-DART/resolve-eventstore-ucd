"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = require("pg");

var _resolveEventstoreBase = _interopRequireDefault(require("resolve-eventstore-base"));

var _loadEventsByCursor = _interopRequireDefault(require("./js/load-events-by-cursor"));

var _loadEventsByTimestamp = _interopRequireDefault(require("./js/load-events-by-timestamp"));

var _freeze = _interopRequireDefault(require("./js/freeze"));

var _unfreeze = _interopRequireDefault(require("./js/unfreeze"));

var _getLatestEvent = _interopRequireDefault(require("./js/get-latest-event"));

var _saveEvent = _interopRequireDefault(require("./js/save-event"));

var _fullJitter = _interopRequireDefault(require("./js/full-jitter"));

var _executeStatement = _interopRequireDefault(require("./js/execute-statement"));

var _injectEvent = _interopRequireDefault(require("./js/inject-event"));

var _coercer = _interopRequireDefault(require("./js/coercer"));

var _escapeId = _interopRequireDefault(require("./js/escape-id"));

var _escape = _interopRequireDefault(require("./js/escape"));

var _shapeEvent = _interopRequireDefault(require("./js/shape-event"));

var _loadSnapshot = _interopRequireDefault(require("./js/load-snapshot"));

var _saveSnapshot = _interopRequireDefault(require("./js/save-snapshot"));

var _dropSnapshot = _interopRequireDefault(require("./js/drop-snapshot"));

var _beginIncrementalImport = _interopRequireDefault(require("./js/begin-incremental-import"));

var _commitIncrementalImport = _interopRequireDefault(require("./js/commit-incremental-import"));

var _rollbackIncrementalImport = _interopRequireDefault(require("./js/rollback-incremental-import"));

var _pushIncrementalImport = _interopRequireDefault(require("./js/push-incremental-import"));

var _connect = _interopRequireDefault(require("./connect"));

var _init = _interopRequireDefault(require("./init"));

var _drop = _interopRequireDefault(require("./drop"));

var _dispose = _interopRequireDefault(require("./dispose"));

var _secretsManager = _interopRequireDefault(require("./secrets-manager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createAdapter = _resolveEventstoreBase.default.bind(null, {
  connect: _connect.default,
  loadEventsByCursor: _loadEventsByCursor.default,
  loadEventsByTimestamp: _loadEventsByTimestamp.default,
  getLatestEvent: _getLatestEvent.default,
  saveEvent: _saveEvent.default,
  init: _init.default,
  drop: _drop.default,
  dispose: _dispose.default,
  freeze: _freeze.default,
  unfreeze: _unfreeze.default,
  shapeEvent: _shapeEvent.default,
  getSecretsManager: _secretsManager.default,
  loadSnapshot: _loadSnapshot.default,
  saveSnapshot: _saveSnapshot.default,
  dropSnapshot: _dropSnapshot.default,
  beginIncrementalImport: _beginIncrementalImport.default,
  commitIncrementalImport: _commitIncrementalImport.default,
  rollbackIncrementalImport: _rollbackIncrementalImport.default,
  pushIncrementalImport: _pushIncrementalImport.default,
  Postgres: _pg.Client,
  escapeId: _escapeId.default,
  escape: _escape.default,
  fullJitter: _fullJitter.default,
  executeStatement: _executeStatement.default,
  injectEvent: _injectEvent.default,
  coercer: _coercer.default
});

var _default = createAdapter;
exports.default = _default;
//# sourceMappingURL=index.js.map