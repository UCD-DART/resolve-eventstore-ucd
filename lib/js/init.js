"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolve_eventstore_base_1 = require("resolve-eventstore-base");
const constants_1 = require("./constants");
const init = async ({ databaseName, eventsTableName, snapshotsTableName, executeStatement, escapeId, }) => {
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
        "threadId" ${constants_1.LONG_NUMBER_SQL_TYPE} NOT NULL,
        "threadCounter" ${constants_1.INT8_SQL_TYPE} NOT NULL,
        "timestamp" ${constants_1.LONG_NUMBER_SQL_TYPE} NOT NULL,
        "aggregateId" ${constants_1.AGGREGATE_ID_SQL_TYPE} NOT NULL,
        "aggregateVersion" ${constants_1.LONG_NUMBER_SQL_TYPE} NOT NULL,
        "type" ${constants_1.LONG_STRING_SQL_TYPE} NOT NULL,
        "payload" ${constants_1.JSON_SQL_TYPE},
        "eventSize" ${constants_1.LONG_NUMBER_SQL_TYPE} NOT NULL,
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
        "snapshotKey" ${constants_1.TEXT_SQL_TYPE} NOT NULL,
        "snapshotContent" ${constants_1.TEXT_SQL_TYPE},
        PRIMARY KEY("snapshotKey")
      );

      CREATE TABLE ${databaseNameAsId}.${threadsTableNameAsId}(
        "threadId" ${constants_1.LONG_NUMBER_SQL_TYPE} NOT NULL,
        "threadCounter" ${constants_1.LONG_NUMBER_SQL_TYPE} NOT NULL,
      PRIMARY KEY("threadId")
      );

      INSERT INTO ${databaseNameAsId}.${threadsTableNameAsId}(
        "threadId",
        "threadCounter"
      ) VALUES ${Array.from(new Array(256))
            .map((_, index) => `(${index}, 0)`)
            .join(',')}
      ;`);
    }
    catch (error) {
        if (error != null && `${error.code}` === '42P07') {
            throw new resolve_eventstore_base_1.EventstoreResourceAlreadyExistError(`Double-initialize storage-postgresql adapter via "${databaseName}" failed`);
        }
        else {
            throw error;
        }
    }
};
exports.default = init;
