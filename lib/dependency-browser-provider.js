"use strict";

var vscode = require("vscode");
var util = require("util");

var getDependencies = require("./get-deps");
var treeToHTML = require("./tree-to-html");

function DependencyBrowserProvider() {}

DependencyBrowserProvider.prototype.provideTextDocumentContent = function provideTextDocumentContent(uri) {
  var fileName = uri.query;
  var tree = getDependencies(fileName, vscode.workspace.rootPath);

  return "<body>" + treeToHTML(tree) + "</body>";
}

module.exports = DependencyBrowserProvider;