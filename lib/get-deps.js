var dependencyTree = require("dependency-tree");
var path = require("path");

module.exports = function getDependencies(filepath, rootPath, includeNodeModules) {
  var tree = dependencyTree({
    filename: filepath,
    directory: rootPath,
    filter: function(p) {
      return includeNodeModules ? true : p.indexOf("node_modules") === -1;
    }
  });

  var parsed = [];
  var lookup = {};

  function processDeps(obj) {
    var keys = Object.keys(obj) || [];
    if (!keys.length) {
      return [];
    }

    return keys.map(function(key) {
      var value = obj[key];
      var parsedDeps = processDep(key, value);
      parsed.pop();
      return parsedDeps;
    });
  }

  function processDep(key, value) {
    var id = String(Math.random());
    var fileInfo = path.parse(key);
    fileInfo.id = id;
    fileInfo.rel = path.relative(filepath, path.join(fileInfo.dir, fileInfo.base)) || fileInfo.base;

    var seenMe = parsed.indexOf(key);
    if (seenMe !== -1) {
      fileInfo.circular = lookup[key];
    } else {
      lookup[key] = id;
    }

    parsed.push(key);

    fileInfo.deps = processDeps(value);

    return fileInfo;
  }

  var treeArray = processDeps(tree);

  return treeArray[0];
};
