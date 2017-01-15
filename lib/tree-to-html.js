"use strict";

var util = require("util");
var path = require("path");

function processDeps(deps, items) {
  deps.forEach(function (depNode) {
    processNode(depNode, items);
  });
}

function processNode(node, items) {
  items.push(util.format("<li id='%s' title='%s'>%s</li>", node.id, node.rel, node.base));

  if (node.deps && node.deps.length) {
    items.push(util.format("<ul id='%s-deps'>", node.id));
    processDeps(node.deps, items);
    items.push("</ul>");
  }
}

module.exports = function treeToHTML(tree) {
  var items = ["<ul>"];
  processNode(tree, items);
  items.push("</ul>");
  var html = items.join("\n");
  console.log(html);
  return html;
};
