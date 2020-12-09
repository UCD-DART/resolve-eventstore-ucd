"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("./constants");

const beginIncrementalImport = async ({
  executeStatement,
  databaseName,
  eventsTableName,
  escapeId,
  escape
}) => {
  try {
    const databaseNameAsId = escapeId(databaseName);
    const incrementalImportTableAsId = escapeId(`${eventsTableName}-incremental-import`);
    const importId = Buffer.from(`${Date.now()}${Math.random()}`).toString('base64').replace(/\/|\+|=/gi, 'z');
    await executeStatement(`CREATE TABLE ${databaseNameAsId}.${incrementalImportTableAsId}(
        "sortedIdx" ${_constants.LONG_NUMBER_SQL_TYPE} NULL,
        "rowid" ${_constants.BIG_SERIAL},
        "threadId" ${_constants.LONG_NUMBER_SQL_TYPE} NULL,
        "threadCounter" ${_constants.INT8_SQL_TYPE} NULL,
        "timestamp" ${_constants.LONG_NUMBER_SQL_TYPE} NOT NULL,
        "aggregateId" ${_constants.LONG_STRING_SQL_TYPE} NOT NULL,
        "aggregateVersion" ${_constants.LONG_NUMBER_SQL_TYPE} NULL,
        "type" ${_constants.LONG_STRING_SQL_TYPE} NOT NULL,
        "payload" ${_constants.JSON_SQL_TYPE},
        "eventSize" ${_constants.LONG_NUMBER_SQL_TYPE} NOT NULL
      );
      
      COMMENT ON TABLE ${databaseNameAsId}.${incrementalImportTableAsId}
      IS ${escape(`RESOLVE INCREMENTAL-IMPORT ${escape(importId)} OWNED TABLE`)};
      `);
    return importId;
  } catch (error) {
    if (error != null && /Relation.*? already exists$/i.test(error.message)) {
      throw new Error(`Previous incremental import is not finished`);
    } else {
      throw error;
    }
  }
};

var _default = beginIncrementalImport;
exports.default = _default;
//# sourceMappingURL=begin-incremental-import.js.map