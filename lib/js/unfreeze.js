"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unfreeze = async ({ executeStatement, databaseName, eventsTableName, escapeId, }) => {
    const databaseNameAsId = escapeId(databaseName);
    const freezeTableNameAsId = escapeId(`${eventsTableName}-freeze`);
    await executeStatement(`DROP TABLE IF EXISTS ${databaseNameAsId}.${freezeTableNameAsId}`);
};
exports.default = unfreeze;
