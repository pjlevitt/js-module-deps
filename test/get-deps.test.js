var assert = require('assert');

var getDeps = require('../lib/get-deps');
var samplesRoot = __dirname + "/sample-files";

suite("Get Dependencies", function() {

  test("Should get simple dependency tree and details", function() {
    var filepath = samplesRoot + "/simple/module-a.js";
    var tree = getDeps(filepath, samplesRoot);
    var expected = [
      {
        "root": "/",
        "dir": "/Users/plevitt/dev/js-module-deps/test/sample-files/simple",
        "base": "module-a.js",
        "ext": ".js",
        "name": "module-a",
        "deps": [
          {
            "root": "/",
            "dir": "/Users/plevitt/dev/js-module-deps/test/sample-files/simple",
            "base": "module-b.js",
            "ext": ".js",
            "name": "module-b",
            "deps": [],
            "circular": false
          },
          {
            "root": "/",
            "dir": "/Users/plevitt/dev/js-module-deps/test/sample-files/simple",
            "base": "module-c.js",
            "ext": ".js",
            "name": "module-c",
            "deps": [],
            "circular": false
          }
        ],
        "circular": false
      }
    ];

    assert.deepEqual(tree, expected);
  });

  // THIS IS MORE COMPLEX THAN CIRCULAR
  test("Should get dependency tree with circular dependencies", function() {
    var filepath = samplesRoot + "/circular/module-a.js";
    var tree = getDeps(filepath, samplesRoot);

    var expected = [
      {
        "root": "/",
        "dir": "/Users/plevitt/dev/js-module-deps/test/sample-files/circular",
        "base": "module-a.js",
        "ext": ".js",
        "name": "module-a",
        "deps": [
          {
            "root": "/",
            "dir": "/Users/plevitt/dev/js-module-deps/test/sample-files/circular",
            "base": "module-b.js",
            "ext": ".js",
            "name": "module-b",
            "deps": [
              {
                "root": "/",
                "dir": "/Users/plevitt/dev/js-module-deps/test/sample-files/circular",
                "base": "module-c.js",
                "ext": ".js",
                "name": "module-c",
                "deps": [
                  {
                    "root": "/",
                    "dir": "/Users/plevitt/dev/js-module-deps/test/sample-files/circular",
                    "base": "module-d.js",
                    "ext": ".js",
                    "name": "module-d",
                    "deps": [
                      {
                        "root": "/",
                        "dir": "/Users/plevitt/dev/js-module-deps/test/sample-files/circular",
                        "base": "module-b.js",
                        "ext": ".js",
                        "name": "module-b",
                        "deps": [],
                        "circular": false
                      }
                    ],
                    "circular": false
                  }
                ],
                "circular": false
              }
            ],
            "circular": true
          },
          {
            "root": "/",
            "dir": "/Users/plevitt/dev/js-module-deps/test/sample-files/simple",
            "base": "module-a.js",
            "ext": ".js",
            "name": "module-a",
            "deps": [
              {
                "root": "/",
                "dir": "/Users/plevitt/dev/js-module-deps/test/sample-files/simple",
                "base": "module-b.js",
                "ext": ".js",
                "name": "module-b",
                "deps": [],
                "circular": false
              },
              {
                "root": "/",
                "dir": "/Users/plevitt/dev/js-module-deps/test/sample-files/simple",
                "base": "module-c.js",
                "ext": ".js",
                "name": "module-c",
                "deps": [],
                "circular": false
              }
            ],
            "circular": false
          }
        ],
        "circular": false
      }
    ];

    assert.deepEqual(tree, expected);
  });

  // TEST NO DEPS

});
