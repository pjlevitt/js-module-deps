"use strict";

var vscode = require("vscode");
var path = require("path");

var validateNode = require("./validate-node");
var DependencyBrowserProvider = require("./dependency-browser-provider");

exports.activate = function activate(context) {
	var provider = new DependencyBrowserProvider();
	var depBrowserRegistration = vscode.workspace.registerTextDocumentContentProvider("browse-dependencies", provider);
  
  var browseDependencies = vscode.commands.registerCommand("extension.browseDependencies", function(node){
    if (!validateNode(node)) {
      vscode.window.showErrorMessage("Cannot show dependencies for type of node : " + node);
    } else {
      try {
        var uri = vscode.Uri.parse("browse-dependencies://authority/Dependencies?" + node.fsPath);
        var fileinfo = path.parse(node.fsPath);

        return vscode
          .commands
          .executeCommand("vscode.previewHtml", uri, vscode.ViewColumn.Two, fileinfo.base + " dependencies")
          .then(function (success) { }, function(error) {
            vscode.window.showErrorMessage(reason);
          });
      } catch (e) {
        console.log(e);
        vscode.window.showErrorMessage("Whoops : " + e.message);
      }
    }
  });

  context.subscriptions.push(browseDependencies, depBrowserRegistration);
};