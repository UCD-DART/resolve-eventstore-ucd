const escape = (str) => `'${String(str).replace(/(['])/gi, "$1$1")}'`;

export default escape;
//# sourceMappingURL=escape.js.map
