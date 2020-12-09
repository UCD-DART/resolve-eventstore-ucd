"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rollbackIncrementalImport = async ({ executeStatement, databaseName, eventsTableName, escapeId, }) => {
    const databaseNameAsId = escapeId(databaseName);
    const incrementalImportTableAsId = escapeId(`${eventsTableName}-incremental-import`);
    await executeStatement(`DROP TABLE IF EXISTS ${databaseNameAsId}.${incrementalImportTableAsId};`);
};
exports.default = rollbackIncrementalImport;
