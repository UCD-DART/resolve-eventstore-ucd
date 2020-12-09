"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AGGREGATE_ID_SQL_TYPE = exports.RESPONSE_SIZE_LIMIT = exports.DATA_API_ERROR_FLAG = exports.PARTIAL_EVENT_FLAG = exports.BATCH_SIZE = exports.BUFFER_SIZE = exports.RESERVED_EVENT_SIZE = exports.BIG_SERIAL = exports.TEXT_SQL_TYPE = exports.JSON_SQL_TYPE = exports.INT8_SQL_TYPE = exports.LONG_NUMBER_SQL_TYPE = exports.LONG_STRING_SQL_TYPE = void 0;
exports.LONG_STRING_SQL_TYPE = 'VARCHAR(190)';
exports.LONG_NUMBER_SQL_TYPE = 'BIGINT';
exports.INT8_SQL_TYPE = 'INT8';
exports.JSON_SQL_TYPE = 'JSONB';
exports.TEXT_SQL_TYPE = 'TEXT';
exports.BIG_SERIAL = 'BIGSERIAL';
exports.RESERVED_EVENT_SIZE = 66; // 3 reserved BIGINT fields with commas
exports.BUFFER_SIZE = 512 * 1024;
exports.BATCH_SIZE = 100;
exports.PARTIAL_EVENT_FLAG = Symbol();
exports.DATA_API_ERROR_FLAG = Symbol();
exports.RESPONSE_SIZE_LIMIT = Symbol();
exports.AGGREGATE_ID_SQL_TYPE = exports.LONG_STRING_SQL_TYPE;
