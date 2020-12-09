export default loadEventsByCursor;
declare function loadEventsByCursor(
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
    cursor,
    limit,
  }: {
    eventTypes: any;
    aggregateIds: any;
    cursor: any;
    limit: any;
  }
): Promise<{
  cursor: string;
  events: any[];
}>;
