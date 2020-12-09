"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var _getLog = _interopRequireDefault(require("./js/get-log"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const connect = async (pool, specific) => {
  var _pool$config;

  const log = (0, _getLog.default)("connect");
  log.debug("configuring postgres client");
  const {
    Postgres,
    escapeId,
    escape,
    fullJitter,
    executeStatement,
    coercer,
  } = specific;
  const {
    databaseName,
    eventsTableName = "events",
    snapshotsTableName = "snapshots",
    secretsTableName = "secrets",
  } =
    (_pool$config = pool.config) !== null && _pool$config !== void 0
      ? _pool$config
      : {};
  Object.assign(pool, {
    databaseName,
    eventsTableName,
    snapshotsTableName,
    secretsTableName,
    Postgres,
    fullJitter,
    coercer,
    executeStatement: executeStatement.bind(null, pool),
    escapeId,
    escape,
  });

  if (pool.executeStatement != null) {
    await pool.executeStatement('SELECT 0 AS "defunct"');
  }

  log.debug("connection to postgres databases established");
};

var _default = connect;
exports.default = _default;
//# sourceMappingURL=connect.js.map
