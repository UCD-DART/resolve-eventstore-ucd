"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const resolve_eventstore_base_1 = __importDefault(require("resolve-eventstore-base"));
const load_events_by_cursor_1 = __importDefault(require("./js/load-events-by-cursor"));
const load_events_by_timestamp_1 = __importDefault(require("./js/load-events-by-timestamp"));
const freeze_1 = __importDefault(require("./js/freeze"));
const unfreeze_1 = __importDefault(require("./js/unfreeze"));
const get_latest_event_1 = __importDefault(require("./js/get-latest-event"));
const save_event_1 = __importDefault(require("./js/save-event"));
const full_jitter_1 = __importDefault(require("./js/full-jitter"));
const execute_statement_1 = __importDefault(require("./js/execute-statement"));
const inject_event_1 = __importDefault(require("./js/inject-event"));
const coercer_1 = __importDefault(require("./js/coercer"));
const escape_id_1 = __importDefault(require("./js/escape-id"));
const escape_1 = __importDefault(require("./js/escape"));
const shape_event_1 = __importDefault(require("./js/shape-event"));
const load_snapshot_1 = __importDefault(require("./js/load-snapshot"));
const save_snapshot_1 = __importDefault(require("./js/save-snapshot"));
const drop_snapshot_1 = __importDefault(require("./js/drop-snapshot"));
const begin_incremental_import_1 = __importDefault(require("./js/begin-incremental-import"));
const commit_incremental_import_1 = __importDefault(require("./js/commit-incremental-import"));
const rollback_incremental_import_1 = __importDefault(require("./js/rollback-incremental-import"));
const push_incremental_import_1 = __importDefault(require("./js/push-incremental-import"));
const connect_1 = __importDefault(require("./connect"));
const init_1 = __importDefault(require("./init"));
const drop_1 = __importDefault(require("./drop"));
const dispose_1 = __importDefault(require("./dispose"));
const secrets_manager_1 = __importDefault(require("./secrets-manager"));
const createAdapter = resolve_eventstore_base_1.default.bind(null, {
    connect: connect_1.default,
    loadEventsByCursor: load_events_by_cursor_1.default,
    loadEventsByTimestamp: load_events_by_timestamp_1.default,
    getLatestEvent: get_latest_event_1.default,
    saveEvent: save_event_1.default,
    init: init_1.default,
    drop: drop_1.default,
    dispose: dispose_1.default,
    freeze: freeze_1.default,
    unfreeze: unfreeze_1.default,
    shapeEvent: shape_event_1.default,
    getSecretsManager: secrets_manager_1.default,
    loadSnapshot: load_snapshot_1.default,
    saveSnapshot: save_snapshot_1.default,
    dropSnapshot: drop_snapshot_1.default,
    beginIncrementalImport: begin_incremental_import_1.default,
    commitIncrementalImport: commit_incremental_import_1.default,
    rollbackIncrementalImport: rollback_incremental_import_1.default,
    pushIncrementalImport: push_incremental_import_1.default,
    Postgres: pg_1.Client,
    escapeId: escape_id_1.default,
    escape: escape_1.default,
    fullJitter: full_jitter_1.default,
    executeStatement: execute_statement_1.default,
    injectEvent: inject_event_1.default,
    coercer: coercer_1.default,
});
exports.default = createAdapter;
