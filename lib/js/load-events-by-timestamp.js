"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _resolveEventstoreBase = require("resolve-eventstore-base");

const loadEventsByTimestamp = async ({
  executeStatement,
  escapeId,
  escape,
  eventsTableName,
  databaseName,
  shapeEvent
}, {
  eventTypes,
  aggregateIds,
  startTime,
  finishTime,
  limit
}) => {
  const injectString = value => `${escape(value)}`;

  const injectNumber = value => `${+value}`;

  const queryConditions = [];
  const events = [];

  if (eventTypes != null) {
    queryConditions.push(`"type" IN (${eventTypes.map(injectString)})`);
  }

  if (aggregateIds != null) {
    queryConditions.push(`"aggregateId" IN (${aggregateIds.map(injectString)})`);
  }

  if (startTime != null) {
    queryConditions.push(`"timestamp" >= ${injectNumber(startTime)}`);
  }

  if (finishTime != null) {
    queryConditions.push(`"timestamp" <= ${injectNumber(finishTime)}`);
  }

  const resultQueryCondition = queryConditions.length > 0 ? `WHERE ${queryConditions.join(' AND ')}` : '';
  const databaseNameAsId = escapeId(databaseName);
  const eventsTableNameAsId = escapeId(eventsTableName);
  const sqlQuery = [`SELECT * FROM ${databaseNameAsId}.${eventsTableNameAsId}`, `${resultQueryCondition}`, `ORDER BY "timestamp" ASC, "threadCounter" ASC, "threadId" ASC`, `LIMIT ${+limit}`].join('\n');
  const rows = await executeStatement(sqlQuery);

  for (const event of rows) {
    events.push(shapeEvent(event));
  }

  return {
    get cursor() {
      return (0, _resolveEventstoreBase.throwBadCursor)();
    },

    events
  };
};

var _default = loadEventsByTimestamp;
exports.default = _default;
//# sourceMappingURL=load-events-by-timestamp.js.map