export default pushIncrementalImport;
declare function pushIncrementalImport({ executeStatement, databaseName, eventsTableName, escapeId, escape }: {
    executeStatement: any;
    databaseName: any;
    eventsTableName: any;
    escapeId: any;
    escape: any;
}, events: any, importId: any): Promise<void>;
