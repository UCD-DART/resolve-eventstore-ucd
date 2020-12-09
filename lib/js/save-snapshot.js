"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var _resolveEventstoreBase = require("resolve-eventstore-base");

var _getLog = _interopRequireDefault(require("./get-log"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const saveSnapshot = async (pool, snapshotKey, content) =>
  (0, _resolveEventstoreBase.snapshotTrigger)(
    pool,
    snapshotKey,
    content,
    async () => {
      const log = (0, _getLog.default)(`saveSnapshot:${snapshotKey}`);
      const {
        databaseName,
        snapshotsTableName,
        escape,
        escapeId,
        executeStatement,
      } = pool;
      const databaseNameAsId = escapeId(databaseName);
      const snapshotsTableNameAsId = escapeId(snapshotsTableName);
      log.debug(`writing the snapshot to database`);
      await executeStatement(`INSERT INTO ${databaseNameAsId}.${snapshotsTableNameAsId}(
      "snapshotKey", 
      "snapshotContent"
    )
    VALUES(${escape(snapshotKey)}, ${escape(content)})
    ON CONFLICT ("snapshotKey") DO UPDATE
    SET "snapshotContent" = ${escape(content)}`);
      log.debug(`the snapshot saved successfully`);
    }
  );

var _default = saveSnapshot;
exports.default = _default;
//# sourceMappingURL=save-snapshot.js.map
