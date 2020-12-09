"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const freeze = async ({ executeStatement, databaseName, eventsTableName, escapeId, }) => {
    const databaseNameAsId = escapeId(databaseName);
    const freezeTableNameAsId = escapeId(`${eventsTableName}-freeze`);
    await executeStatement(`CREATE TABLE IF NOT EXISTS ${databaseNameAsId}.${freezeTableNameAsId} (
      "surrogate" BIGINT NOT NULL,
      PRIMARY KEY("surrogate")
    );
    COMMENT ON TABLE ${databaseNameAsId}.${freezeTableNameAsId}
    IS 'RESOLVE EVENT STORE ${freezeTableNameAsId} FREEZE MARKER';
    `);
};
exports.default = freeze;
