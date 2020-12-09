export default saveEvent;
declare function saveEvent(
  {
    databaseName,
    eventsTableName,
    executeStatement,
    escapeId,
    escape,
  }: {
    databaseName: any;
    eventsTableName: any;
    executeStatement: any;
    escapeId: any;
    escape: any;
  },
  event: any
): Promise<void>;
