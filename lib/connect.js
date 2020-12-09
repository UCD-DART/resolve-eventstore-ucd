"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_log_1 = __importDefault(require("./js/get-log"));
const connect = async (pool, specific) => {
    var _a;
    const log = get_log_1.default('connect');
    log.debug('configuring postgres client');
    const { Postgres, escapeId, escape, fullJitter, executeStatement, coercer, } = specific;
    const { databaseName, eventsTableName = 'events', snapshotsTableName = 'snapshots', secretsTableName = 'secrets', } = (_a = pool.config) !== null && _a !== void 0 ? _a : {};
    Object.assign(pool, {
        databaseName,
        eventsTableName,
        snapshotsTableName,
        secretsTableName,
        Postgres,
        fullJitter,
        coercer,
        executeStatement: executeStatement.bind(null, pool),
        escapeId,
        escape,
    });
    if (pool.executeStatement != null) {
        await pool.executeStatement('SELECT 0 AS "defunct"');
    }
    log.debug('connection to postgres databases established');
};
exports.default = connect;
