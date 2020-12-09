"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

const loadSnapshot = async (
  { databaseName, snapshotsTableName, executeStatement, escapeId, escape },
  snapshotKey
) => {
  if (snapshotKey == null || snapshotKey.constructor !== String) {
    throw new Error("Snapshot key must be string");
  }

  const databaseNameAsId = escapeId(databaseName);
  const snapshotsTableNameAsId = escapeId(snapshotsTableName);
  const rows = await executeStatement(`SELECT "snapshotContent" FROM ${databaseNameAsId}.${snapshotsTableNameAsId}
    WHERE "snapshotKey" = ${escape(snapshotKey)} 
    LIMIT 1`);
  const content = rows.length > 0 ? rows[0].snapshotContent : null;
  return content;
};

var _default = loadSnapshot;
exports.default = _default;
//# sourceMappingURL=load-snapshot.js.map
