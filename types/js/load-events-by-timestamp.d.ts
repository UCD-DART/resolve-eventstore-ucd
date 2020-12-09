export default loadEventsByTimestamp;
declare function loadEventsByTimestamp({ executeStatement, escapeId, escape, eventsTableName, databaseName, shapeEvent, }: {
    executeStatement: any;
    escapeId: any;
    escape: any;
    eventsTableName: any;
    databaseName: any;
    shapeEvent: any;
}, { eventTypes, aggregateIds, startTime, finishTime, limit }: {
    eventTypes: any;
    aggregateIds: any;
    startTime: any;
    finishTime: any;
    limit: any;
}): Promise<{
    readonly cursor: any;
    events: any[];
}>;
