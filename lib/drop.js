"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var _os = require("os");

var _resolveEventstoreBase = require("resolve-eventstore-base");

var _getLog = _interopRequireDefault(require("./js/get-log"));

var _drop = _interopRequireDefault(require("./js/drop"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const dropSecretsStore = async (pool) => {
  const log = (0, _getLog.default)("dropSecretsStore");
  log.debug(`dropping secrets store database tables`);
  const { secretsTableName, databaseName, executeStatement, escapeId } = pool;
  log.verbose(`secretsTableName: ${secretsTableName}`);

  if (!secretsTableName || !escapeId || !databaseName || !executeStatement) {
    const error = Error(`adapter pool was not initialized properly!`);
    log.error(error.message);
    log.verbose(error.stack || error.message);
    throw error;
  }

  log.debug(`dropping secrets store database tables and indices`);
  log.verbose(`secretsTableName: ${secretsTableName}`);
  log.verbose(`databaseName: ${databaseName}`);
  const databaseNameAsId = escapeId(databaseName);
  const secretsTableNameAsId = escapeId(secretsTableName);
  const globalIndexName = escapeId(`${secretsTableName}-global`);
  const statements = [
    `DROP TABLE ${databaseNameAsId}.${secretsTableNameAsId}`,
    `DROP INDEX IF EXISTS ${databaseNameAsId}.${globalIndexName}`,
  ];
  const errors = [];

  for (const statement of statements) {
    try {
      await executeStatement(statement);
    } catch (error) {
      if (error != null) {
        log.error(error.message);
        log.verbose(error.stack);

        if (`${error.code}` === "42P01") {
          throw new _resolveEventstoreBase.EventstoreResourceNotExistError(
            `duplicate event store resource drop detected`
          );
        }

        errors.push(error);
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(errors.map((error) => error.stack).join(_os.EOL));
  }

  log.debug(`secrets store database tables and indices are dropped`);
};

const drop = async (pool) => {
  const log = (0, _getLog.default)("drop");
  const {
    databaseName,
    eventsTableName,
    snapshotsTableName,
    executeStatement,
    escapeId,
  } = pool;

  const createDropEventStorePromise = () =>
    (0, _drop.default)({
      databaseName,
      eventsTableName,
      snapshotsTableName,
      executeStatement,
      escapeId,
    });

  log.debug(`dropping the event store`);
  await Promise.all([createDropEventStorePromise(), dropSecretsStore(pool)]);
  log.debug(`the event store dropped`);
};

var _default = drop;
exports.default = _default;
//# sourceMappingURL=drop.js.map
