"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const beginIncrementalImport = async ({ executeStatement, databaseName, eventsTableName, escapeId, escape, }) => {
    try {
        const databaseNameAsId = escapeId(databaseName);
        const incrementalImportTableAsId = escapeId(`${eventsTableName}-incremental-import`);
        const importId = Buffer.from(`${Date.now()}${Math.random()}`)
            .toString('base64')
            .replace(/\/|\+|=/gi, 'z');
        await executeStatement(`CREATE TABLE ${databaseNameAsId}.${incrementalImportTableAsId}(
        "sortedIdx" ${constants_1.LONG_NUMBER_SQL_TYPE} NULL,
        "rowid" ${constants_1.BIG_SERIAL},
        "threadId" ${constants_1.LONG_NUMBER_SQL_TYPE} NULL,
        "threadCounter" ${constants_1.INT8_SQL_TYPE} NULL,
        "timestamp" ${constants_1.LONG_NUMBER_SQL_TYPE} NOT NULL,
        "aggregateId" ${constants_1.LONG_STRING_SQL_TYPE} NOT NULL,
        "aggregateVersion" ${constants_1.LONG_NUMBER_SQL_TYPE} NULL,
        "type" ${constants_1.LONG_STRING_SQL_TYPE} NOT NULL,
        "payload" ${constants_1.JSON_SQL_TYPE},
        "eventSize" ${constants_1.LONG_NUMBER_SQL_TYPE} NOT NULL
      );
      
      COMMENT ON TABLE ${databaseNameAsId}.${incrementalImportTableAsId}
      IS ${escape(`RESOLVE INCREMENTAL-IMPORT ${escape(importId)} OWNED TABLE`)};
      `);
        return importId;
    }
    catch (error) {
        if (error != null && /Relation.*? already exists$/i.test(error.message)) {
            throw new Error(`Previous incremental import is not finished`);
        }
        else {
            throw error;
        }
    }
};
exports.default = beginIncrementalImport;
