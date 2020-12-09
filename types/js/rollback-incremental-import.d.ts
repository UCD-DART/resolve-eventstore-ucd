export default rollbackIncrementalImport;
declare function rollbackIncrementalImport({ executeStatement, databaseName, eventsTableName, escapeId, }: {
    executeStatement: any;
    databaseName: any;
    eventsTableName: any;
    escapeId: any;
}): Promise<void>;
