"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var recast = require("recast");
var loaderUtils = require("loader-utils");
var util = require("util");
function print(o) {
    console.log(util.inspect(o, false, Infinity, true));
}
function walkTree(node, type, callback) {
    if (!node) {
        return;
    }
    if (node.type === type) {
        var ret = callback(node);
        if (ret) {
            return true;
        }
    }
    for (var key in node) {
        var children = node[key];
        if (children) {
            if (children.type || children instanceof Array) {
                if (children.type) {
                    children = [children];
                }
                for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                    var child = children_1[_i];
                    var ret = walkTree(child, type, callback);
                    if (ret) {
                        return true;
                    }
                }
            }
        }
    }
}
exports.defaultTagRules = ['css', 'injectGlobal', /^styled(\.[a-z]+|\([A-Z][a-z]+\))$/];
function minifyCss(css) {
    if (!css)
        return css;
    css = css
        .replace(/\s*(\w+)\s*:\s*([^;]+?)\s*(;|}|$)/g, '$1:$2$3')
        .replace(/\s*(\{|\}|,|;|:)\s*/g, '$1')
        .replace(/(^\s+|\s+$)/g, ' ');
    css = css.replace(/([^};]+){/g, function (_, g) {
        return g.replace(/\s*([+>~]+)\s*/g, '$1') + '{';
    });
    return css;
}
function isCSSTag(tag, tagRules) {
    if (!tag)
        return false;
    for (var _i = 0, tagRules_1 = tagRules; _i < tagRules_1.length; _i++) {
        var rule = tagRules_1[_i];
        if (typeof rule === 'string') {
            if (rule === tag) {
                return true;
            }
        }
        else if (typeof rule === 'function') {
            if (rule(tag)) {
                return true;
            }
        }
        else if (rule instanceof RegExp) {
            if (rule.test(tag)) {
                return true;
            }
        }
    }
    return false;
}
function minifyAst(ast, tagRules) {
    walkTree(ast, 'TaggedTemplateExpression', function (node) {
        if (isCSSTag((recast.print(node.tag).code || '').trim(), tagRules)) {
            walkTree(node, 'TemplateElement', function (node) {
                node.value.cooked = minifyCss(node.value.cooked);
                node.value.raw = minifyCss(node.value.raw) || '';
            });
        }
    });
}
function minifyCssInJs(content, options) {
    if (options === void 0) { options = {}; }
    var ast = recast.parse(content, {
        parser: tslib_1.__assign({ parse: function (source, options) {
                return require('cherow').parseModule(source, Object.assign(options, {
                    next: true,
                    experimental: true,
                }));
            } }, options.recast),
    });
    minifyAst(ast, options.tagRules || exports.defaultTagRules);
    try {
        return recast.print(ast).code;
    }
    catch (error) {
        console.error('[minify-cssinjs-loader]', error);
    }
    return content;
}
function loader(content, map, meta) {
    var options = loaderUtils.getOptions(this) || {};
    return minifyCssInJs(content, options);
}
exports.default = loader;
//# sourceMappingURL=index.js.map
