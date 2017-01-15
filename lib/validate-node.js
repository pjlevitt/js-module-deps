var path = require("path");

//TODO: Move to settings
var validExtensions = [
  ".js",
  ".jsx"
];

/**
 * Ensure the given explorer node is a supported file type
 *
 * @param {Object} node   - VS Code Explorer node
 * @returns {bool}        - True is supported file type
 */
module.exports = function isValidFileNode(node) {
  var fileInfo = path.parse(node.fsPath);
  return (validExtensions.indexOf(fileInfo.ext) !== -1);
};
