const babelrc = require("./.babelrc.json");

module.exports = require("babel-jest").createTransformer(babelrc);
