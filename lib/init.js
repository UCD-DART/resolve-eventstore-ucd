"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var _resolveEventstoreBase = require("resolve-eventstore-base");

var _getLog = _interopRequireDefault(require("./js/get-log"));

var _init = _interopRequireDefault(require("./js/init"));

var _constants = require("./js/constants");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const initSecretsStore = async (pool) => {
  const { secretsTableName, escapeId, databaseName, executeStatement } = pool;
  const log = (0, _getLog.default)("initSecretsStore");

  if (!secretsTableName || !escapeId || !databaseName || !executeStatement) {
    const error = Error(`adapter pool was not initialized properly!`);
    log.error(error.message);
    log.verbose(error.stack || error.message);
    throw error;
  }

  log.debug(`initializing secrets store database tables`);
  log.verbose(`secretsTableName: ${secretsTableName}`);
  log.verbose(`databaseName: ${databaseName}`);
  const databaseNameAsId = escapeId(databaseName);
  const secretsTableNameAsId = escapeId(secretsTableName);
  const globalIndexName = escapeId(`${secretsTableName}-global`);

  try {
    await executeStatement(`CREATE TABLE IF NOT EXISTS ${databaseNameAsId}.${secretsTableNameAsId} (
        "idx" BIGSERIAL,
        "id" ${_constants.AGGREGATE_ID_SQL_TYPE} NOT NULL PRIMARY KEY,
        "secret" text COLLATE pg_catalog."default"
       );
       CREATE UNIQUE INDEX IF NOT EXISTS ${globalIndexName}
       ON ${databaseNameAsId}.${secretsTableNameAsId}
       ("idx");`);
  } catch (error) {
    if (error) {
      let errorToThrow = error;

      if (`${error.code}` === "42P07") {
        errorToThrow = new _resolveEventstoreBase.EventstoreResourceAlreadyExistError(
          `duplicate initialization of the postgresql-serverless secrets store with the same parameters not allowed`
        );
      }

      log.error(errorToThrow.message);
      log.verbose(errorToThrow.stack);
      throw errorToThrow;
    }
  }

  log.debug(`secrets store database tables are initialized`);
};

const init = async (pool) => {
  const log = (0, _getLog.default)("init");
  log.debug("initializing databases");
  const {
    databaseName,
    eventsTableName,
    snapshotsTableName,
    executeStatement,
    escapeId,
  } = pool;

  const createInitEventStorePromise = () =>
    (0, _init.default)({
      databaseName,
      eventsTableName,
      snapshotsTableName,
      executeStatement,
      escapeId,
    });

  const result = await Promise.all([
    createInitEventStorePromise(),
    initSecretsStore(pool),
  ]);
  log.debug("databases are initialized");
  return result;
};

var _default = init;
exports.default = _default;
//# sourceMappingURL=init.js.map
