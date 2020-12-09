"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolve_eventstore_base_1 = require("resolve-eventstore-base");
const get_log_1 = __importDefault(require("./get-log"));
const saveSnapshot = async (pool, snapshotKey, content) => resolve_eventstore_base_1.snapshotTrigger(pool, snapshotKey, content, async () => {
    const log = get_log_1.default(`saveSnapshot:${snapshotKey}`);
    const { databaseName, snapshotsTableName, escape, escapeId, executeStatement, } = pool;
    const databaseNameAsId = escapeId(databaseName);
    const snapshotsTableNameAsId = escapeId(snapshotsTableName);
    log.debug(`writing the snapshot to database`);
    await executeStatement(`INSERT INTO ${databaseNameAsId}.${snapshotsTableNameAsId}(
      "snapshotKey", 
      "snapshotContent"
    )
    VALUES(${escape(snapshotKey)}, ${escape(content)})
    ON CONFLICT ("snapshotKey") DO UPDATE
    SET "snapshotContent" = ${escape(content)}`);
    log.debug(`the snapshot saved successfully`);
});
exports.default = saveSnapshot;
