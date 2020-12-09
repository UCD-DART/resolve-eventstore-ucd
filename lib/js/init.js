"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _resolveEventstoreBase = require("resolve-eventstore-base");

var _constants = require("./constants");

const init = async ({
  databaseName,
  eventsTableName,
  snapshotsTableName,
  executeStatement,
  escapeId
}) => {
  const databaseNameAsId = escapeId(databaseName);
  const eventsTableNameAsId = escapeId(eventsTableName);
  const threadsTableNameAsId = escapeId(`${eventsTableName}-threads`);
  const snapshotsTableNameAsId = escapeId(snapshotsTableName);
  const aggregateIdAndVersionIndexName = escapeId(`${eventsTableName}-aggregateIdAndVersion`);
  const aggregateIndexName = escapeId(`${eventsTableName}-aggregateId`);
  const aggregateVersionIndexName = escapeId(`${eventsTableName}-aggregateVersion`);
  const typeIndexName = escapeId(`${eventsTableName}-type`);
  const timestampIndexName = escapeId(`${eventsTableName}-timestamp`);

  try {
    await executeStatement(`CREATE TABLE ${databaseNameAsId}.${eventsTableNameAsId}(
        "threadId" ${_constants.LONG_NUMBER_SQL_TYPE} NOT NULL,
        "threadCounter" ${_constants.INT8_SQL_TYPE} NOT NULL,
        "timestamp" ${_constants.LONG_NUMBER_SQL_TYPE} NOT NULL,
        "aggregateId" ${_constants.AGGREGATE_ID_SQL_TYPE} NOT NULL,
        "aggregateVersion" ${_constants.LONG_NUMBER_SQL_TYPE} NOT NULL,
        "type" ${_constants.LONG_STRING_SQL_TYPE} NOT NULL,
        "payload" ${_constants.JSON_SQL_TYPE},
        "eventSize" ${_constants.LONG_NUMBER_SQL_TYPE} NOT NULL,
        PRIMARY KEY("threadId", "threadCounter")
      );
      
      CREATE UNIQUE INDEX ${aggregateIdAndVersionIndexName}
      ON ${databaseNameAsId}.${eventsTableNameAsId}
      USING BTREE("aggregateId", "aggregateVersion");
      
      CREATE INDEX ${aggregateIndexName}
      ON ${databaseNameAsId}.${eventsTableNameAsId}
      USING BTREE("aggregateId");
      
      CREATE INDEX ${aggregateVersionIndexName}
      ON ${databaseNameAsId}.${eventsTableNameAsId}
      USING BTREE("aggregateVersion");
      
      CREATE INDEX ${typeIndexName}
      ON ${databaseNameAsId}.${eventsTableNameAsId}
      USING BTREE("type");
      
      CREATE INDEX ${timestampIndexName}
      ON ${databaseNameAsId}.${eventsTableNameAsId}
      USING BTREE("timestamp");
      
      CREATE TABLE ${databaseNameAsId}.${snapshotsTableNameAsId} (
        "snapshotKey" ${_constants.TEXT_SQL_TYPE} NOT NULL,
        "snapshotContent" ${_constants.TEXT_SQL_TYPE},
        PRIMARY KEY("snapshotKey")
      );

      CREATE TABLE ${databaseNameAsId}.${threadsTableNameAsId}(
        "threadId" ${_constants.LONG_NUMBER_SQL_TYPE} NOT NULL,
        "threadCounter" ${_constants.LONG_NUMBER_SQL_TYPE} NOT NULL,
      PRIMARY KEY("threadId")
      );

      INSERT INTO ${databaseNameAsId}.${threadsTableNameAsId}(
        "threadId",
        "threadCounter"
      ) VALUES ${Array.from(new Array(256)).map((_, index) => `(${index}, 0)`).join(',')}
      ;`);
  } catch (error) {
    if (error != null && `${error.code}` === '42P07') {
      throw new _resolveEventstoreBase.EventstoreResourceAlreadyExistError(`Double-initialize storage-postgresql adapter via "${databaseName}" failed`);
    } else {
      throw error;
    }
  }
};

var _default = init;
exports.default = _default;
//# sourceMappingURL=init.js.map