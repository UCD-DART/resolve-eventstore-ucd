"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var _resolveEventstoreBase = require("resolve-eventstore-base");

var _os = require("os");

const drop = async ({
  databaseName,
  eventsTableName,
  snapshotsTableName,
  executeStatement,
  escapeId,
}) => {
  const databaseNameAsId = escapeId(databaseName);
  const eventsTableNameAsId = escapeId(eventsTableName);
  const threadsTableNameAsId = escapeId(`${eventsTableName}-threads`);
  const freezeTableNameAsId = escapeId(`${eventsTableName}-freeze`);
  const snapshotsTableNameAsId = escapeId(snapshotsTableName);
  const aggregateIdAndVersionIndexName = escapeId(
    `${eventsTableName}-aggregateIdAndVersion`
  );
  const aggregateIndexName = escapeId(`${eventsTableName}-aggregateId`);
  const aggregateVersionIndexName = escapeId(
    `${eventsTableName}-aggregateVersion`
  );
  const typeIndexName = escapeId(`${eventsTableName}-type`);
  const timestampIndexName = escapeId(`${eventsTableName}-timestamp`);
  const statements = [
    `DROP TABLE ${databaseNameAsId}.${eventsTableNameAsId}`,
    `DROP INDEX IF EXISTS ${databaseNameAsId}.${aggregateIdAndVersionIndexName}`,
    `DROP INDEX IF EXISTS ${databaseNameAsId}.${aggregateIndexName}`,
    `DROP INDEX IF EXISTS ${databaseNameAsId}.${aggregateVersionIndexName}`,
    `DROP INDEX IF EXISTS ${databaseNameAsId}.${typeIndexName}`,
    `DROP INDEX IF EXISTS ${databaseNameAsId}.${timestampIndexName}`,
    `DROP TABLE ${databaseNameAsId}.${threadsTableNameAsId}`,
    `DROP TABLE IF EXISTS ${databaseNameAsId}.${freezeTableNameAsId}`,
    `DROP TABLE ${databaseNameAsId}.${snapshotsTableNameAsId}`,
  ];
  const errors = [];

  for (const statement of statements) {
    try {
      await executeStatement(statement);
    } catch (error) {
      if (error != null && `${error.code}` === "42P01") {
        throw new _resolveEventstoreBase.EventstoreResourceNotExistError(
          `Double-free eventstore-postgresql adapter via "${databaseName}" failed`
        );
      } else {
        errors.push(error);
      }
    }
  }

  if (errors.length > 0) {
    const error = new Error();
    error.message = errors.map(({ message }) => message).join(_os.EOL);
    error.stack = errors.map(({ stack }) => stack).join(_os.EOL);
    const errorCodes = new Set(
      errors.map(({ code }) => code).filter((code) => code != null)
    );

    if (errorCodes.size === 1) {
      error.code = [...errorCodes][0];
    }

    throw error;
  }
};

var _default = drop;
exports.default = _default;
//# sourceMappingURL=drop.js.map
