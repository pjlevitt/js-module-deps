// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

var lib = require("./lib");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    var browseDependencies = vscode.commands.registerCommand('extension.browseDependencies', function(node){
        if (!lib.validateNode(node)) {
            vscode.window.showErrorMessage('Cannot show dependencies for type of node : ' + node);
        } else {
            try {
                var tree = lib.getDependencies(node.fsPath, vscode.workspace.rootPath);
                console.log(tree);
                vscode.window.showInformationMessage('tree: ' + tree);
            } catch (e) {
                console.log(e);
                vscode.window.showErrorMessage('Whoops : ' + e.message);
            }
        }
    });

    context.subscriptions.push(browseDependencies);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;