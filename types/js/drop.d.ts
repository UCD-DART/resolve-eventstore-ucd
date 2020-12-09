export default drop;
declare function drop({
  databaseName,
  eventsTableName,
  snapshotsTableName,
  executeStatement,
  escapeId,
}: {
  databaseName: any;
  eventsTableName: any;
  snapshotsTableName: any;
  executeStatement: any;
  escapeId: any;
}): Promise<void>;
