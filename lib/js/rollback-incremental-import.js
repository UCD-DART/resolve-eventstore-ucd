"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const rollbackIncrementalImport = async ({
  executeStatement,
  databaseName,
  eventsTableName,
  escapeId
}) => {
  const databaseNameAsId = escapeId(databaseName);
  const incrementalImportTableAsId = escapeId(`${eventsTableName}-incremental-import`);
  await executeStatement(`DROP TABLE IF EXISTS ${databaseNameAsId}.${incrementalImportTableAsId};`);
};

var _default = rollbackIncrementalImport;
exports.default = _default;
//# sourceMappingURL=rollback-incremental-import.js.map