export default freeze;
declare function freeze({
  executeStatement,
  databaseName,
  eventsTableName,
  escapeId,
}: {
  executeStatement: any;
  databaseName: any;
  eventsTableName: any;
  escapeId: any;
}): Promise<void>;
