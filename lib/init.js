"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolve_eventstore_base_1 = require("resolve-eventstore-base");
const get_log_1 = __importDefault(require("./js/get-log"));
const init_1 = __importDefault(require("./js/init"));
const constants_1 = require("./js/constants");
const initSecretsStore = async (pool) => {
    const { secretsTableName, escapeId, databaseName, executeStatement } = pool;
    const log = get_log_1.default('initSecretsStore');
    if (!secretsTableName || !escapeId || !databaseName || !executeStatement) {
        const error = Error(`adapter pool was not initialized properly!`);
        log.error(error.message);
        log.verbose(error.stack || error.message);
        throw error;
    }
    log.debug(`initializing secrets store database tables`);
    log.verbose(`secretsTableName: ${secretsTableName}`);
    log.verbose(`databaseName: ${databaseName}`);
    const databaseNameAsId = escapeId(databaseName);
    const secretsTableNameAsId = escapeId(secretsTableName);
    const globalIndexName = escapeId(`${secretsTableName}-global`);
    try {
        await executeStatement(`CREATE TABLE IF NOT EXISTS ${databaseNameAsId}.${secretsTableNameAsId} (
        "idx" BIGSERIAL,
        "id" ${constants_1.AGGREGATE_ID_SQL_TYPE} NOT NULL PRIMARY KEY,
        "secret" text COLLATE pg_catalog."default"
       );
       CREATE UNIQUE INDEX IF NOT EXISTS ${globalIndexName}
       ON ${databaseNameAsId}.${secretsTableNameAsId}
       ("idx");`);
    }
    catch (error) {
        if (error) {
            let errorToThrow = error;
            if (`${error.code}` === '42P07') {
                errorToThrow = new resolve_eventstore_base_1.EventstoreResourceAlreadyExistError(`duplicate initialization of the postgresql-serverless secrets store with the same parameters not allowed`);
            }
            log.error(errorToThrow.message);
            log.verbose(errorToThrow.stack);
            throw errorToThrow;
        }
    }
    log.debug(`secrets store database tables are initialized`);
};
const init = async (pool) => {
    const log = get_log_1.default('init');
    log.debug('initializing databases');
    const { databaseName, eventsTableName, snapshotsTableName, executeStatement, escapeId, } = pool;
    const createInitEventStorePromise = () => init_1.default({
        databaseName,
        eventsTableName,
        snapshotsTableName,
        executeStatement,
        escapeId,
    });
    const result = await Promise.all([
        createInitEventStorePromise(),
        initSecretsStore(pool),
    ]);
    log.debug('databases are initialized');
    return result;
};
exports.default = init;
