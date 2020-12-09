"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const executeStatement = async (pool, sql) => {
    const errors = [];
    let rows = null;
    const connection = new pool.Postgres({
        user: pool.config.user,
        database: pool.config.database,
        port: pool.config.port,
        host: pool.config.host,
        password: pool.config.password,
        keepAlive: false,
        connectionTimeoutMillis: 45000,
        idle_in_transaction_session_timeout: 45000,
        query_timeout: 45000,
        statement_timeout: 45000,
    });
    try {
        await connection.connect();
        const result = await connection.query(sql);
        if (result != null && Array.isArray(result.rows)) {
            rows = JSON.parse(JSON.stringify(result.rows));
        }
        return rows;
    }
    catch (error) {
        errors.push(error);
    }
    finally {
        await connection.end();
    }
    if (errors.length > 0) {
        const error = new Error();
        error.message = errors.map(({ message }) => message).join(os_1.EOL);
        error.stack = errors.map(({ stack }) => stack).join(os_1.EOL);
        const errorCodes = new Set(errors.map(({ code }) => code).filter((code) => code != null));
        if (errorCodes.size === 1) {
            error.code = [...errorCodes][0];
        }
        throw error;
    }
    return rows;
};
exports.default = executeStatement;
