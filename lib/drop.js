"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const resolve_eventstore_base_1 = require("resolve-eventstore-base");
const get_log_1 = __importDefault(require("./js/get-log"));
const drop_1 = __importDefault(require("./js/drop"));
const dropSecretsStore = async (pool) => {
    const log = get_log_1.default('dropSecretsStore');
    log.debug(`dropping secrets store database tables`);
    const { secretsTableName, databaseName, executeStatement, escapeId } = pool;
    log.verbose(`secretsTableName: ${secretsTableName}`);
    if (!secretsTableName || !escapeId || !databaseName || !executeStatement) {
        const error = Error(`adapter pool was not initialized properly!`);
        log.error(error.message);
        log.verbose(error.stack || error.message);
        throw error;
    }
    log.debug(`dropping secrets store database tables and indices`);
    log.verbose(`secretsTableName: ${secretsTableName}`);
    log.verbose(`databaseName: ${databaseName}`);
    const databaseNameAsId = escapeId(databaseName);
    const secretsTableNameAsId = escapeId(secretsTableName);
    const globalIndexName = escapeId(`${secretsTableName}-global`);
    const statements = [
        `DROP TABLE ${databaseNameAsId}.${secretsTableNameAsId}`,
        `DROP INDEX IF EXISTS ${databaseNameAsId}.${globalIndexName}`,
    ];
    const errors = [];
    for (const statement of statements) {
        try {
            await executeStatement(statement);
        }
        catch (error) {
            if (error != null) {
                log.error(error.message);
                log.verbose(error.stack);
                if (`${error.code}` === '42P01') {
                    throw new resolve_eventstore_base_1.EventstoreResourceNotExistError(`duplicate event store resource drop detected`);
                }
                errors.push(error);
            }
        }
    }
    if (errors.length > 0) {
        throw new Error(errors.map((error) => error.stack).join(os_1.EOL));
    }
    log.debug(`secrets store database tables and indices are dropped`);
};
const drop = async (pool) => {
    const log = get_log_1.default('drop');
    const { databaseName, eventsTableName, snapshotsTableName, executeStatement, escapeId, } = pool;
    const createDropEventStorePromise = () => drop_1.default({
        databaseName,
        eventsTableName,
        snapshotsTableName,
        executeStatement,
        escapeId,
    });
    log.debug(`dropping the event store`);
    await Promise.all([createDropEventStorePromise(), dropSecretsStore(pool)]);
    log.debug(`the event store dropped`);
};
exports.default = drop;
