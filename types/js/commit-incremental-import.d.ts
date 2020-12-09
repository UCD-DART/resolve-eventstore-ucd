export default commitIncrementalImport;
declare function commitIncrementalImport({ executeStatement, databaseName, eventsTableName, escapeId, escape }: {
    executeStatement: any;
    databaseName: any;
    eventsTableName: any;
    escapeId: any;
    escape: any;
}, importId: any, validateAfterCommit: any): Promise<void>;
