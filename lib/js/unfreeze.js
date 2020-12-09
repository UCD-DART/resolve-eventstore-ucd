"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

const unfreeze = async ({
  executeStatement,
  databaseName,
  eventsTableName,
  escapeId,
}) => {
  const databaseNameAsId = escapeId(databaseName);
  const freezeTableNameAsId = escapeId(`${eventsTableName}-freeze`);
  await executeStatement(
    `DROP TABLE IF EXISTS ${databaseNameAsId}.${freezeTableNameAsId}`
  );
};

var _default = unfreeze;
exports.default = _default;
//# sourceMappingURL=unfreeze.js.map
