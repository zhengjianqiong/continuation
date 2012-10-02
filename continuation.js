var util = require('util');
var escodegen = require('escodegen');

var meta = require('./package.json');
var parser = require('./lib/parser');
var traverse = require('./lib/traverse');
var helpers = require('./lib/helpers');
var Program = require('./lib/syntax/Program');
  
var header = '/* Generated by Continuation.js v' + meta.version + ' */\n';

exports.compile = function (origCode, options) {
  if (!options) {
    options = {};
  }
  
  var indent = '  ';
  if (options.tabIndent) {
    indent = '\t';
  } else if (options.indentSpaces) {
    indent = Array(options.indentSpaces + 1).join(c);
  }
  
  //Wrap whole file into a function
  var code = '(function () {\n' + origCode + '\n}).call(this);\n';
  
  helpers.reset();
  var ast = parser.parse(code);
  
  if (!options.force && !transformNeeded(ast)) {
    return header + origCode;
  }
  
  ast.normalize();
  //console.error(util.inspect(ast, false, null, true));
  ast.transform();
  //console.error(util.inspect(ast, false, null, true));
  
  ast = new Program(ast.body[0].expression.callee.object.body.body);

  //ast = escodegen.attachComments(ast, ast.comments, ast.tokens);
  code = escodegen.generate(ast, {
    format: {
      indent: {
        style: indent,
        base: 0
      },
    },
    comment: true,
  });
  
  return header + code;
};

//Alias
exports.transform = exports.compile;

var transformNeeded = function (ast) {
  var needed = false;
  traverse(ast, function (node) {
    if (node.type === 'CallExpression') {
      if (node.callee.type === 'Identifier') {
        if (node.callee.name === helpers.contName || node.callee.name === helpers.obtainName) {
          needed = true;
        }
      }
    }
    return node;
  });
  return needed;
}
