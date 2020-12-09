export default loadSnapshot;
declare function loadSnapshot(
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
): Promise<any>;
