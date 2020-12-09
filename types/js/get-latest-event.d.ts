export default getLatestEvent;
declare function getLatestEvent(
  {
    executeStatement,
    escapeId,
    escape,
    eventsTableName,
    databaseName,
    shapeEvent,
  }: {
    executeStatement: any;
    escapeId: any;
    escape: any;
    eventsTableName: any;
    databaseName: any;
    shapeEvent: any;
  },
  {
    eventTypes,
    aggregateIds,
    startTime,
    finishTime,
  }: {
    eventTypes: any;
    aggregateIds: any;
    startTime: any;
    finishTime: any;
  }
): Promise<any>;
