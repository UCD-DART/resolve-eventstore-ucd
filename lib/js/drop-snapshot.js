"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const dropSnapshot = async ({
  databaseName,
  snapshotsTableName,
  executeStatement,
  escapeId,
  escape
}, snapshotKey) => {
  const databaseNameAsId = escapeId(databaseName);
  const snapshotsTableNameAsId = escapeId(snapshotsTableName);
  await executeStatement(`DELETE FROM ${databaseNameAsId}.${snapshotsTableNameAsId}
    WHERE "snapshotKey" LIKE ${escape(`${snapshotKey}%`)}`);
};

var _default = dropSnapshot;
exports.default = _default;
//# sourceMappingURL=drop-snapshot.js.map