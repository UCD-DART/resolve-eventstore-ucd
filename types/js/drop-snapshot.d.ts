export default dropSnapshot;
declare function dropSnapshot(
  {
    databaseName,
    snapshotsTableName,
    executeStatement,
    escapeId,
    escape,
  }: {
    databaseName: any;
    snapshotsTableName: any;
    executeStatement: any;
    escapeId: any;
    escape: any;
  },
  snapshotKey: any
): Promise<void>;
