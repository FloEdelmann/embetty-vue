module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "131e":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("6086");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("1362cc7f", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "1eb2":
/***/ (function(module, exports, __webpack_require__) {

// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}


/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "2350":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "25e1":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("de7a");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("2a3f76da", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2f5a":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, "\n.embetty-tweet.answered[data-v-2941da65] {\n  margin-top: 0;\n  margin-bottom: 0.5rem;\n  border: 0;\n  padding: 0;\n}\n.embetty-tweet.answered header[data-v-2941da65] {\n    padding-bottom: 0.5rem;\n}\n.embetty-tweet.answered article[data-v-2941da65] {\n    border-left: 4px solid #bbb;\n    margin-left: 16px;\n    padding-left: 2rem;\n    padding-bottom: 1rem;\n}\n.embetty-tweet.answered article p[data-v-2941da65] {\n      font-size: 14px;\n}\n.embetty-tweet.answered article .created-at[data-v-2941da65] {\n      display: none;\n}\n.embetty-tweet.answered .powered-by[data-v-2941da65] {\n    display: none;\n}\n.embetty-tweet[data-v-2941da65] {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  max-width: 100%;\n  font-family: var(--embetty-font-family, Helvetica, Roboto, \"Segoe UI\", Calibri, sans-serif);\n  border: 1px solid var(--embetty-border-color, #ccc);\n  border-width: 1px;\n  border-radius: 4px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  font-size: 16px;\n  line-height: 1;\n  max-width: 642px;\n  padding: 1rem 1.2rem;\n}\n@media (min-width: 600px) {\n.embetty-tweet[data-v-2941da65] {\n      padding: 1.5rem 2rem;\n}\n}\n.embetty-tweet header[data-v-2941da65] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    margin-bottom: .5rem;\n}\n.embetty-tweet header img[data-v-2941da65] {\n      width: 36px;\n      height: 36px;\n      border-radius: 50%;\n}\n.embetty-tweet header > span[data-v-2941da65] {\n      display: inline-block;\n      margin: 0 var(--embetty-spacing, 1rem);\n}\n.embetty-tweet header strong[data-v-2941da65] {\n      font-size: 16px;\n      display: block;\n}\n.embetty-tweet header a[data-v-2941da65],\n    .embetty-tweet header a[data-v-2941da65]:hover {\n      font-size: 14px;\n      color: #697882;\n      text-decoration: none;\n}\n.embetty-tweet article span[data-v-2941da65] {\n    display: block;\n}\n.embetty-tweet article p[data-v-2941da65] {\n    margin: 0 auto 0.5rem;\n    line-height: 1.4;\n    letter-spacing: .01em;\n}\n@media (min-width: 600px) {\n.embetty-tweet article p[data-v-2941da65] {\n        font-size: 18px;\n}\n}\n.embetty-tweet .media a[data-v-2941da65] {\n    height: 100%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n.embetty-tweet .media a[data-v-2941da65]:not(:first-child) {\n      display: none;\n}\n.embetty-tweet .media img[data-v-2941da65] {\n    max-width: 100%;\n    width: 100%;\n    height: 100%;\n    -o-object-fit: cover;\n       object-fit: cover;\n}\n@media (min-width: 600px) {\n.embetty-tweet .media[data-v-2941da65] {\n      display: grid;\n      grid-column-gap: 1px;\n      grid-row-gap: 1px;\n}\n.embetty-tweet .media a[data-v-2941da65]:not(:first-child) {\n        display: block;\n}\n.embetty-tweet .media.media-2[data-v-2941da65] {\n        grid-template-columns: 50% 50%;\n}\n.embetty-tweet .media.media-3[data-v-2941da65] {\n        grid-template-columns: auto 40%;\n}\n.embetty-tweet .media.media-3 a[data-v-2941da65]:first-child {\n          grid-row: 1 / span 2;\n}\n.embetty-tweet .media.media-4[data-v-2941da65] {\n        grid-template-columns: auto 20%;\n}\n.embetty-tweet .media.media-4 a[data-v-2941da65]:first-child {\n          grid-row: 1 / span 3;\n}\n}\n.embetty-tweet .links[data-v-2941da65] {\n    border: 1px solid var(--embetty-border-color, #ccc);\n    border-width: 1px;\n    border-radius: 4px;\n    text-decoration: none;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    color: #14171a;\n    font-size: 14px;\n}\n.embetty-tweet .links[data-v-2941da65]:hover, .embetty-tweet .links[data-v-2941da65]:focus {\n      background-color: #f5f8fa;\n      border-color: rgba(136, 153, 166, 0.5);\n      -webkit-transition: background-color .15s ease-in-out, border-color .15s ease-in-out;\n      transition: background-color .15s ease-in-out, border-color .15s ease-in-out;\n}\n@media (min-width: 600px) {\n.embetty-tweet .links[data-v-2941da65] {\n        -webkit-box-orient: horizontal;\n        -webkit-box-direction: normal;\n            -ms-flex-direction: row;\n                flex-direction: row;\n}\n}\n.embetty-tweet .links img[data-v-2941da65] {\n      max-width: 100%;\n      -o-object-fit: cover;\n         object-fit: cover;\n      display: inline-block;\n}\n@media (min-width: 600px) {\n.embetty-tweet .links img[data-v-2941da65] {\n          height: 125px;\n          width: 125px;\n          min-width: 125px;\n}\n}\n.embetty-tweet .links > *[data-v-2941da65]:last-child {\n      margin-bottom: 0;\n}\n.embetty-tweet .links .link-body[data-v-2941da65] {\n      padding: .5rem;\n}\n@media (min-width: 600px) {\n.embetty-tweet .links .link-body[data-v-2941da65] {\n          display: -webkit-box;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-orient: vertical;\n          -webkit-box-direction: normal;\n              -ms-flex-direction: column;\n                  flex-direction: column;\n          padding: .5rem .8rem;\n}\n}\n.embetty-tweet .links h3[data-v-2941da65] {\n      font-size: 14px;\n      line-height: 1.3;\n      margin: 0;\n      margin-bottom: .3em;\n}\n.embetty-tweet .links p[data-v-2941da65] {\n      display: none;\n}\n@media (min-width: 600px) {\n.embetty-tweet .links p[data-v-2941da65] {\n          display: block;\n          -webkit-box-flex: 1;\n              -ms-flex-positive: 1;\n                  flex-grow: 1;\n          -webkit-hyphens: auto;\n              -ms-hyphens: auto;\n                  hyphens: auto;\n          line-height: 18px;\n          font-size: 14px;\n          margin: 0;\n          margin-bottom: .3em;\n}\n}\n.embetty-tweet .links span[data-v-2941da65] {\n      margin-top: auto;\n      color: #999;\n}\n.embetty-tweet .created-at[data-v-2941da65] {\n    margin-top: .5rem;\n    display: block;\n    font-size: 14px;\n    color: #777;\n    text-decoration: none;\n}\n.embetty-tweet .created-at svg[data-v-2941da65] {\n      height: 22px;\n      vertical-align: middle;\n}\n.embetty-tweet .powered-by[data-v-2941da65] {\n    position: absolute;\n    z-index: 3;\n    right: -20px;\n    bottom: 0px;\n    padding: 20px 46px 5px 20px;\n    font-size: 14px;\n    color: #777;\n    text-decoration: none;\n    opacity: .3;\n}\n.embetty-tweet .powered-by[data-v-2941da65]:hover, .embetty-tweet .powered-by[data-v-2941da65]:focus {\n      opacity: 1;\n}\n.embetty-tweet .powered-by .embetty-logo[data-v-2941da65] {\n      position: absolute;\n      right: 0;\n      bottom: -42px;\n      width: 40px;\n}\n", ""]);

// exports


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "3846":
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__("9e1e") && /./g.flags != 'g') __webpack_require__("86cc").f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__("0bfb")
});


/***/ }),

/***/ "386b":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "4917":
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__("214f")('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),

/***/ "499e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addStylesClient; });
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "4e4b":
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 154.34 315.62\"><defs><style>.cls-1{fill:#735aa3;}.cls-2{fill:#b99bc9;}.cls-3{fill:#cc352b;}.cls-4{fill:#030304;}.cls-5{fill:#020204;}.cls-6{fill:#6ac4cb;}.cls-7{fill:#fff;}.cls-8{fill:#1a1a1a;}</style></defs><g id=\"Ebene_2\" data-name=\"Ebene 2\"><g id=\"Ebene_1-2\" data-name=\"Ebene 1\"><path class=\"cls-1\" d=\"M79.63,1.83c-5.3-3.6-11.4,4.2-9.4,9.2,0,.1.1.2.2.4-.3,1.7-.2,3.7,1.2,4.7v.1c.4,1.3.9,2.6,1.3,4a19.51,19.51,0,0,1-.2,7.6V28c-.3.4-.6.6-.7,1.1-.8,3,2.8,2.9,4.4,1.7a1.36,1.36,0,0,0-.2-2.2.1.1,0,0,1,.1-.1,5.82,5.82,0,0,0,.4-3.2c0-.6-.1-1.2-.1-1.7a1.46,1.46,0,0,0,.6-.9v-.3l.3-2.1.3-.3a5.29,5.29,0,0,0,1.5-3.2,1.38,1.38,0,0,0,1-1.3.9.9,0,0,0-.1-.5C82.83,11,83.83,4.73,79.63,1.83Z\"/><path class=\"cls-1\" d=\"M70.33,21.83a2.51,2.51,0,0,0-.4-.7,3.81,3.81,0,0,0-1.3-.9,1.33,1.33,0,0,0-.3-.8,26.87,26.87,0,0,0-4.5-3.7,8.28,8.28,0,0,0-4.4-1.9,1.25,1.25,0,0,0-1.3.8l-.3.3c-1.1.7-.9,2.3-.1,3.4a3.38,3.38,0,0,0,.6,1.2l.2.2a3.59,3.59,0,0,0,1,.7v.1a1.45,1.45,0,0,0,1.6.7c2.2.9,4.9.5,6.6,2.1a1.22,1.22,0,0,0,.9.4,1.1,1.1,0,0,0,1,.5A1.33,1.33,0,0,0,70.33,21.83Z\"/><path class=\"cls-1\" d=\"M83.63,19.43a2.6,2.6,0,0,0-3.2.6,3.53,3.53,0,0,0-.4,3.7c.1.1.1.2.2.3a2.46,2.46,0,0,0-.1,1.7c-.2,1.3,1.5,2.7,2.5,1.4.6-.8,1.2-1.5,1.9-2.3a1.06,1.06,0,0,0,0-1.4,3.55,3.55,0,0,0,.4-.9A3.06,3.06,0,0,0,83.63,19.43Z\"/><path class=\"cls-1\" d=\"M113.83,248.93c-1.5-.4-3.4.1-4.9,0a33.94,33.94,0,0,1-5.5-.4,37.35,37.35,0,0,1-7.3-1.9,5.3,5.3,0,0,0-3.4-1.7c-2.9-1.4-5.8-2.9-8.7-4.3-.1-.1-.2-.2-.3-.2a77.88,77.88,0,0,1-11-8.9c-2.3-2.3-4.3-4.7-6.5-7.1a7.64,7.64,0,0,0-.9-.9c-.4-.4-.7-.8-1.1-1.2a1.19,1.19,0,0,0-1.1-.4c-.2-.4-.5-.8-.7-1.2a30,30,0,0,0-3.3-5.4,16.31,16.31,0,0,1-.6-4.5,3.26,3.26,0,0,0-1.6-3,23.56,23.56,0,0,1,7.8-5.5,6.21,6.21,0,0,0,3.7,3,.37.37,0,0,1,.3.1l1.5,2.5a1.45,1.45,0,0,0,.1,1.1,5.94,5.94,0,0,0,.4.8.6.6,0,0,0,.1.4,7.76,7.76,0,0,0,1.2,2.2,23.49,23.49,0,0,0,2.3,3.2,50.2,50.2,0,0,0,6.6,10.3,24.16,24.16,0,0,0,2.7,3.6,3.81,3.81,0,0,0,.9,1.3,34.4,34.4,0,0,0,3.6,2.8,1.2,1.2,0,0,0,.4,1.2l1.2,1.2a1.08,1.08,0,0,0,.7.3,43.71,43.71,0,0,0,7.6,4.3,3.55,3.55,0,0,0,.9.4,39.86,39.86,0,0,0,12.4,2.7,1.25,1.25,0,0,0,1.1-.4h.7a3.45,3.45,0,0,0,1.8-.5,4.18,4.18,0,0,0,2.3-1.8c5.3-8.5,1.9-17.9-1.8-26.2a3.13,3.13,0,0,0-1.7-1.7,1.27,1.27,0,0,0,.1-.6l1.2-10.2a2.67,2.67,0,0,0-.3-1.8,26.36,26.36,0,0,0,.1-9.3c-1.1-7-3.8-15.4-8-21.3-3.9-5.5-10.6-9.5-16.6-12.2a28.18,28.18,0,0,0-13.4-2.3,4.23,4.23,0,0,0-2.7-.7c-2.3.4-4.5,1.1-6.7,1.7a3.54,3.54,0,0,0-2.4,2,24.08,24.08,0,0,0-3.3,1.5,32.9,32.9,0,0,0-17.8,14.6,35.39,35.39,0,0,0-9.3,27.3,8.74,8.74,0,0,0-.8,1c-2,3.3.7,7,4,7.1a17.89,17.89,0,0,0-.3,8.3,2.37,2.37,0,0,0,.9,1.5c-.4,4,1.7,8.8,4.8,11.7a3,3,0,0,0,.4,2.1,3.74,3.74,0,0,0,1.5,1.3,2.8,2.8,0,0,0,2,.2l.7-.3a2,2,0,0,0,.7-.6h.8c-.1.2-.1.4-.2.6a35.54,35.54,0,0,1-20.7,25.1,4.13,4.13,0,0,0-1.1.7q-4.35,1.2-8.7,2.1c-3.1.6-6.2.7-9.1,1.9l.1.1c-2,1.2-2.4,4.5.6,5.2,6,1.6,14.2-1,20.1-2.7q2.7-.75,5.4-1.8c3.2,1.5,6.6-.6,9.3-2.7a13.57,13.57,0,0,0,11.9-6.7.35.35,0,0,1,.1-.2c2.6-.6,5-2.1,5.9-4.8a5.76,5.76,0,0,0,.2-2.6c2.1,1.6,4,3.6,6.6,4.3a8.13,8.13,0,0,0,3,2.1,6.23,6.23,0,0,0-3.6,2c-2.1,2.4-2.6,5.9-2.6,9.3a3.45,3.45,0,0,0-2,3.2,5.84,5.84,0,0,0,.4,1.8c0,.2-.1.4-.1.6-1.2,13.1,6,26,18.3,31a2.34,2.34,0,0,0,1.1.2,5.32,5.32,0,0,0,5.1,2,16.35,16.35,0,0,0,10-.6,3.67,3.67,0,0,0,1.9-1.5c.7-.1,1.4-.3,2-.4,4.6-1.2,2.7-8.4-2-7.2a17.54,17.54,0,0,1-9.1-.1,4.3,4.3,0,0,0-.9-1c-3.6-3.5-7.1-5.7-8.4-10.9-1.4-5.4.4-9.9,2.9-14.6v-.1c.2-.2.4-.3.6-.5a3,3,0,0,0,1.1-3c1.8,1.3,3.6,2.5,5.4,3.8l.1.1a3.3,3.3,0,0,0-2.2,1.7,14.09,14.09,0,0,0-1.4,8.6c-.1.2-.1.5-.2.7a10.25,10.25,0,0,0,7,11c5,1.6,8.4-1.4,13-2.5a3.4,3.4,0,0,0,2.5-2.9c1.6-1,1.2-4.1-1.2-4.1-.3,0-.6.1-.8.1a3.34,3.34,0,0,0-1.5-.3,11.75,11.75,0,0,0-3.8.9,4.13,4.13,0,0,0-1.1-.7,6.47,6.47,0,0,0-1.3-.4s-.6-.2-.8-.3a1.42,1.42,0,0,0-.4-.2c-.2-.1-.4-.3-.6-.4a4,4,0,0,1-.4-.3l-.3-.3-.7-.7a8.34,8.34,0,0,0-1.2-.8,2.75,2.75,0,0,0-.8-1.5,16.66,16.66,0,0,1,.6-2.9,3.92,3.92,0,0,0,1.4.8,3.23,3.23,0,0,0,2.7-.4,14.7,14.7,0,0,0,1.3-1l.2-.2a15.09,15.09,0,0,0,7-2.7c3.7-2.5,7.7-7.8,6.5-12.5C117.93,254.43,117.93,250.13,113.83,248.93Zm-63.6-58.7a23.16,23.16,0,0,0-5.8,4.5l.9-2.7a35.82,35.82,0,0,1,2.4-4.8l.3-.3c1.3-1.4,2.6-2.8,3.9-4.3.1,0,.2-.1.3-.1a101,101,0,0,0,11.5-7.8c1.4-.5,2.7-1,4.1-1.4a1.42,1.42,0,0,0,.6.2,43.82,43.82,0,0,0,9.5-1c2.1.2,4.3.3,6.4.4,1.8.7,3.6,1.5,5.5,2.3a1.56,1.56,0,0,0,.6.8c.8.5,1.6,1.1,2.4,1.6a3.09,3.09,0,0,0,1.6,1.1,5.74,5.74,0,0,0,1.6,4.1,4.51,4.51,0,0,0,1.4,1,75,75,0,0,1,.3,8,16.27,16.27,0,0,0-1.1,2.3,13.36,13.36,0,0,1-2.1,2,24.69,24.69,0,0,0-1-2.9,1.4,1.4,0,0,0,.5-1.9c-.1-.3-.3-.5-.4-.8a.92.92,0,0,0-.2-1,23.07,23.07,0,0,1-1.4-1.9,1.22,1.22,0,0,0-1-.6c-.2-.3-.5-.6-.7-.9a1.2,1.2,0,0,0-1.4-.3c-5.5-6.5-15.7-6.7-23.7-4.8C59.13,182.13,53.53,185.33,50.23,190.23Z\"/><path class=\"cls-1\" d=\"M58.53,264.93a1.4,1.4,0,0,0-1.2-1.4,1.27,1.27,0,0,0-1.8.1,8.52,8.52,0,0,0-1.7,2.5c-.3.3-.7.6-1,.9a5.7,5.7,0,0,0-1.3.1c-1.1.3-2.2.7-3.3,1a3.66,3.66,0,0,0-1.6,1c-1.3.4-2.7.7-4,1.1a.76.76,0,0,0-.4.2c-1.8-.2-3.6.3-4.4,2.2a1.88,1.88,0,0,0-.2.8,15.47,15.47,0,0,0-3.8,9.5,2.77,2.77,0,0,0,.1.9,24.45,24.45,0,0,0-1.2,5.5c-.4,2.4-.5,5.1-.8,7.7-2.4,3.5-3.4,7.8-4.8,11.8-1.1,3.5,3.8,6.4,6.2,3.6a24.57,24.57,0,0,0,5.4-12.1l.2-.2a3.34,3.34,0,0,0,.8-3.7,3.11,3.11,0,0,0,1.7-2.1c2.4-6.9,5-12.6,10.8-17.4a3.83,3.83,0,0,0,2.9-2.6l.9-2.5a3,3,0,0,0-.1-2.3l.3-1.8a6.11,6.11,0,0,1,.7-1.4A1.48,1.48,0,0,0,58.53,264.93Z\"/><path class=\"cls-2\" d=\"M97.13,188a2,2,0,0,0,.2-.9l-.2-3a1.49,1.49,0,0,0-1.7-1.4v-.2c-.3-1.1-.5-2.2-.8-3.3a1.33,1.33,0,0,0-1.8-1,14,14,0,0,0-2.7-2.1,1,1,0,0,0-.9-.1h0a1.37,1.37,0,0,0-1.3-.4,1.38,1.38,0,0,0-.4-.3c-.8-1.5-3.1-2-5-1.9-.1,0-.2-.1-.4-.1a1.38,1.38,0,0,0-1.5.5,1.48,1.48,0,0,0-1.8-1.3c-.9.2-1.8.3-2.8.5l-6.1,1.2a22.1,22.1,0,0,0-4.9.9,1.24,1.24,0,0,0-.8.6,1.41,1.41,0,0,0-.9-.1l-1.8.6a.6.6,0,0,0-.4.1c-.3.1-.7.3-1,.4a1.38,1.38,0,0,0-1,1.4.76.76,0,0,0-.4.2c-2.6,2-5.1,4.1-7.7,6.2-1.2,1,.4,3.1,1.7,2.2a60,60,0,0,1,13.5-7.6,1.25,1.25,0,0,0,1.2.3c1-.2,1.9-.4,2.9-.7,1.2-.2,2.4-.4,3.7-.5h6a1.38,1.38,0,0,0,.4.3,11.08,11.08,0,0,0,3.5,1.2h0l5.3,3.8a1.32,1.32,0,0,0,1.2.2c.3,1.8,1.2,3.5,3.3,3.5.2,0,.3,0,.4-.1-.1.8-.1,1.6-.2,2.4a1.27,1.27,0,0,0,.1.6,1.63,1.63,0,0,0,2.6,1.3,3,3,0,0,0,1.2-1.9A3.49,3.49,0,0,0,97.13,188Z\"/><path class=\"cls-2\" d=\"M111.43,243.93c-5.4,3-11.4.2-16.4-2.3a69.32,69.32,0,0,1-7.5-4.3.91.91,0,0,0-.4-.8l-1.5-1.5a1.28,1.28,0,0,0-.4-1c-1.1-1-2.2-2-3.2-3-.5-.6-.9-1.2-1.4-1.8,0-.1-.1-.2-.1-.3-.3-.5-.7-1.1-1-1.6a1.26,1.26,0,0,0-1-.7l-.4-.4a1.58,1.58,0,0,0-1.2-.5,9.29,9.29,0,0,1-.5-1,1.42,1.42,0,0,0-.2-.6c-1.1-2.1-2.3-4.1-3.4-6.2-.3-.5-.6-.7-1-.7-.5-1-1-1.9-1.5-2.9a1.64,1.64,0,0,0,.1-1,12.17,12.17,0,0,0-2.6-5.2,3,3,0,0,0-1.5-1.8,2.45,2.45,0,0,0-3.8-.6,4.62,4.62,0,0,0-.7.7c-1.2.1-2.8.8-3.1,2.3-1.7.9-2,3.4.1,4.8a3,3,0,0,0,.8.4,10.46,10.46,0,0,0,1.3,2.3,1.42,1.42,0,0,0,.2.6l3,4.2a1.87,1.87,0,0,0,.7.6,1.62,1.62,0,0,0,.4,1l3.7,4.6a1.44,1.44,0,0,0,1.5.4l.1.1a.86.86,0,0,0,.3.6c.8,1.1,1.7,2.2,2.5,3.3a1.41,1.41,0,0,0,1.4.6c.4.5.8,1.1,1.2,1.6a1.25,1.25,0,0,0,1.3.4,51.09,51.09,0,0,0,7.5,5.4,1.45,1.45,0,0,0,1.1.1,73.2,73.2,0,0,0,11.3,6.2c5.2,2.2,10.6,3.5,15.8.6C114.63,245.63,113.13,243,111.43,243.93Z\"/><path class=\"cls-2\" d=\"M95.63,291.53a13.85,13.85,0,0,1-7.2-7.3,1.28,1.28,0,0,0,.4-1c-.2-1.5-.4-3.1-.6-4.6a12.4,12.4,0,0,0,1.1-3.7,2.92,2.92,0,0,0-.6-2.1c.1-.2.1-.3.2-.5a1.47,1.47,0,0,0,.5-.6c.1-.4.3-.7.4-1.1.6-1.6-1.8-2.4-2.6-1.1a14.59,14.59,0,0,0-1.6,3,8.18,8.18,0,0,0-2.7,4c-2.6,8.5,4.3,15.2,11.6,17.9C96,294.83,97.13,292.23,95.63,291.53Z\"/><path class=\"cls-2\" d=\"M90.93,305.43a21.79,21.79,0,0,1-14.7-4.5,1.22,1.22,0,0,0-1.4-.1l-2.1-1.8c-2.9-5.2-5.9-10.3-8.8-15.5a2.2,2.2,0,0,0-.1-.8,25.33,25.33,0,0,1-1.2-3.6,2,2,0,0,0,.5-1.4c-.2-1.6-.5-3.2-.7-4.9.3-2.3.7-4.6,1-6.9v-.6c.8-1.7,1.7-3.3,2.5-5a1.15,1.15,0,0,0,.1-1,3,3,0,0,0,.8-1.7l.1-.1a1.27,1.27,0,0,0,.9-.7l.3-.3a1.46,1.46,0,0,0,.5-2,8.79,8.79,0,0,1-.6-1,1.62,1.62,0,0,0-1.4-.7h0a1.06,1.06,0,0,0-1.2-.1.78.78,0,0,0-.4-.4,2.12,2.12,0,0,0-2.2-1.5c-2.2,0-2.8,1.9-2.5,3.7a15.63,15.63,0,0,0-4.2,3.2c-.4.4-.9.8-1.3,1.2a90,90,0,0,1-25.6,9.1c-1.7.3-1.2,2.9.4,2.9a40.33,40.33,0,0,0,14.6-2.4,1.38,1.38,0,0,0,1.1.1,65.89,65.89,0,0,0,14.4-7.6c-.6,1.1-1.1,2.2-1.7,3.3a1.31,1.31,0,0,0,.3,1.8,26.47,26.47,0,0,0-2,4.7,46.57,46.57,0,0,0-.9,7.5c-.1.1-.3.2-.4.3l-.3.3a1.4,1.4,0,0,0-1.9.1,51.2,51.2,0,0,0-8.1,11q-1.65,1.35-3.3,3a1.49,1.49,0,0,0,2.1,2.1c.7-.7,1.5-1.3,2.2-2a1.42,1.42,0,0,0,.6-.2c.5-.3,1.1-.6,1.6-.9a1.34,1.34,0,0,0,.6-.7,23,23,0,0,0,7.8-5.1.1.1,0,0,0,.1.1c.9,1.3,1.8,2.7,2.7,4a1.48,1.48,0,0,0,0,1.3,31.13,31.13,0,0,0,31.8,16.5A1.35,1.35,0,1,0,90.93,305.43Z\"/><path class=\"cls-3\" d=\"M84.83,144.13a5.5,5.5,0,0,0-.7-.9,2.15,2.15,0,0,0-3.1-2.6c-.1.1-.2.1-.3.2a.9.9,0,0,0-.5-.1,3.3,3.3,0,0,0-2.2.2c-1.6.3-3.3,1-3.3,2.9-.1,2.2,2,3.3,3.9,3.4h.1a3.53,3.53,0,0,0,1.4-.3,7.62,7.62,0,0,0,3.3.2A2,2,0,0,0,84.83,144.13Z\"/><path class=\"cls-1\" d=\"M147.33,134.23c-8.5,23.8-21,35.4-35.5,42.7,0,0-10-22.4-34.2-23-25.9-.6-38.2,23-38.2,23-13.1-7.7-25.5-21.5-33-42.7-14.1-39.7,3.1-101.8,70.1-101.8C146.43,32.43,162.53,91.53,147.33,134.23Z\"/><path class=\"cls-4\" d=\"M40,179.33l-1.6-.9c-10.6-6.2-25-18.9-33.8-43.6a86.51,86.51,0,0,1-4.1-37.7A78.79,78.79,0,0,1,14.13,60c9.4-13.4,27.9-29.3,62.3-29.3,36.6,0,55.5,15.9,64.8,29.2,14.1,20,17.1,48.7,7.7,75-7.6,21.4-18.8,34.9-36.4,43.7l-1.6.8-.7-1.7c-.1-.2-9.9-21.4-32.7-22-24.5-.6-36.5,21.8-36.7,22.1Zm36.6-27.1h1c21.1.5,32,17.1,34.9,22.4,15.8-8.4,26.1-21.1,33.1-41l1.6.6-1.6-.6c9-25.2,6.2-52.7-7.3-71.8-12.8-18.1-34.2-27.7-62-27.7-32.9,0-50.5,15.1-59.4,27.9a76.77,76.77,0,0,0-13,35.5,84.22,84.22,0,0,0,4,36.2c8,22.6,20.9,34.7,30.8,40.9a53,53,0,0,1,8.9-10.6A41.88,41.88,0,0,1,76.63,152.23Z\"/><path class=\"cls-4\" d=\"M120.23,220.93a25.81,25.81,0,0,0-1.8-4.6,14.85,14.85,0,0,0-2.7-4.3c2.4-7.7,2.9-18.8,1.1-26.5-2.6-11.6-8-19.3-20.3-27.1-9.9-6.2-22.7-6.4-33.4-2.4-10,3.7-20.1,10.7-25.7,19.8-3,5-4.3,10.7-5.3,16.5s-.9,13.1,3,18.1a32.53,32.53,0,0,0-.3,4.4c0,8.1,3.5,17.2,10.7,21.5a.37.37,0,0,0,.3.1l-.9,3.6a22.82,22.82,0,0,1-6.7,10.3c-6.9,6.4-16.3,8.8-25.2,10.7-3.2.7-7.8,2.4-6.5,6.6s6.3,4.3,9.9,4.1l3.5-.3a81.51,81.51,0,0,0,11,.4c1.8,0,3.6-.2,5.5-.3-4.6,3.6-5.5,10.8-5.8,16.2-.2,3.8-.2,7.6-1.3,11.3-1,3.5-4.1,6.2-4.7,9.8a5.73,5.73,0,0,0,4.5,6.6c3.3.8,6.3-1,8.2-3.6a14.42,14.42,0,0,0,2.3-5.8l.2-.2c0-.1.1-.2.1-.3.3-1,.7-2.1,1-3.1.4-1.3,1-2.6,1.5-3.8a6.11,6.11,0,0,1,1.3-2.2v-.1a9.79,9.79,0,0,1,3.1-2.6c3.2-1.8,7.1-2.6,9.7-5.1l.9,2.4a31.33,31.33,0,0,0,22,18,32.16,32.16,0,0,0,8.2.8,25.36,25.36,0,0,0,2.9-.4,14.7,14.7,0,0,0,6-2.3V307a17.64,17.64,0,0,0,7.3-3.5c1.6-1.3,3.3-3,3.8-5.1a4.4,4.4,0,0,0-2.6-5.1,5,5,0,0,0-1.3-.4l1.5-.6c3.4-1.4,7.7-3.9,9.6-7.2a4,4,0,0,0-.6-5,5,5,0,0,0-5-.5c-2,.6-3.9,1.1-6,.4a7.61,7.61,0,0,1-2.8-1.5,5.82,5.82,0,0,1-1-1.1.71.71,0,0,1-.3-.6v-.1h0a1.94,1.94,0,0,1,1.7-1l2.5-.3a.1.1,0,0,1,.1-.1,20.57,20.57,0,0,0,14.2-12.1c1.6-3.8,2.4-10.4.1-14.5v-.2a1,1,0,0,1-.4-.5h0l-.1-.1c-.1-.1-.2-.1-.3-.3v-.1h-.1a1.79,1.79,0,0,1-.7-.5,2.94,2.94,0,0,1-1-.3h0a5.7,5.7,0,0,0-1.3.1,1.27,1.27,0,0,0-.6.1,2.19,2.19,0,0,0,.5-.3,35.53,35.53,0,0,0,3.1-2.3,17.39,17.39,0,0,1,1.1-1.8,9,9,0,0,0,1.2-2.4v-.3a1.33,1.33,0,0,1,.3-.5.35.35,0,0,1,.1-.2h-.1a23.45,23.45,0,0,0,1.7-8A27.05,27.05,0,0,0,120.23,220.93Zm-84.6-27.3a44.86,44.86,0,0,1,4.7-13.6,45.56,45.56,0,0,1,20.2-19.6c9.4-4.6,21.2-5.7,30.9-1.3,10,4.5,17.2,14.2,20.4,24.4,1.8,5.9,2.2,12.2,2.2,18.4,0,5.3-1,10.7-4,15.1a33.38,33.38,0,0,1-4.3-1,14.07,14.07,0,0,1-4.9-3.1,15.2,15.2,0,0,1-4.4-8.6.75.75,0,0,0-.1-.5,1.7,1.7,0,0,0-.1-.7l.3-.6a18,18,0,0,0,.3-8.3,13.24,13.24,0,0,0-.1-12.8c-2.3-4.2-6.5-7-11-8.4-7.6-2.4-16.2-1.4-23.5,2a1.39,1.39,0,0,0-1,.5,32.34,32.34,0,0,0-4.4,2.7c-4.9,3.5-8.7,8.3-12.2,13.1a.66.66,0,0,0-.1.6,35.81,35.81,0,0,0-8.4,14.6C34.63,202.33,34.93,197.83,35.63,193.63Zm48.6-17.9a2.56,2.56,0,0,0-3,.2,2,2,0,0,0-.6,2.3,30.9,30.9,0,0,0-15.1.4,1.9,1.9,0,0,0,.8-2.2,2.62,2.62,0,0,0-.5-.9,32.8,32.8,0,0,1,8.8-1.8c5.8-.4,12.2.6,16.9,4.4a6.47,6.47,0,0,1,.9.8c-.2.1-.4.1-.5.2a2.39,2.39,0,0,0-1,2.9,2.5,2.5,0,0,0,2.6,1.7,2.94,2.94,0,0,0,1.8-1,11.48,11.48,0,0,1,.9,8.7,20.75,20.75,0,0,0-7.5-9.6,33.54,33.54,0,0,0-3.6-2.1A2.93,2.93,0,0,0,84.23,175.73Zm-1.9,2.1c-.4-.7.8-.7,1.2-.4.5.5.1,1.2-.5,1.4h-.1a1.45,1.45,0,0,0-.7-.2A.75.75,0,0,0,82.33,177.83Zm11.6,2.8c0,.1.1.1.1.2a.37.37,0,0,0-.1.3c-.1.4-.2.7-.7.8-.3.1-.6-.2-.7-.5C92.23,180.43,93.33,180.53,93.93,180.63Zm-31.1-3.4-.3-.3c.1-.1.3-.1.4-.2a.87.87,0,0,0,1,.1c.2-.1.7-.2.7.2s-.4.4-.6.4A4.3,4.3,0,0,1,62.83,177.23Zm.8,2a45,45,0,0,0-12.4,6.6,39.35,39.35,0,0,1,7.4-6.7c.7-.5,1.5-.9,2.3-1.4A3,3,0,0,0,63.63,179.23ZM38,217.33c-.7-7,1.6-13.8,5.6-19.6,8.2-11.7,25-21.4,39.3-15.7,7.6,3.1,13,11.3,10.7,19.5a26.13,26.13,0,0,0-14.3-3.1,45.22,45.22,0,0,0-12.1,2.2c-5.3,1.9-10,4.7-12.2,7.1a26.86,26.86,0,0,0-7,18.5,27.23,27.23,0,0,0,.4,4.2,10.36,10.36,0,0,0-1.7,3.3A23.66,23.66,0,0,1,38,217.33Zm34.7,4.1a2.52,2.52,0,0,0-1.4,3c.6,2.3,4.1,3.1,5.7,1.3a59.2,59.2,0,0,0,6.8,8.2,25.23,25.23,0,0,0,3,2.7,2,2,0,0,0-1.1,1.1,2.39,2.39,0,0,0,.4,2h0a52.07,52.07,0,0,1-5.5-3.6,2.79,2.79,0,0,0,1.3-2.2,2.59,2.59,0,0,0-2.1-2.7,2.76,2.76,0,0,0-3,1.2,1.42,1.42,0,0,0-.2.6,70.79,70.79,0,0,1-10.5-10.7,3.1,3.1,0,0,0,2.4-1,3,3,0,0,0,.2-3.8,2.8,2.8,0,0,0-3.7-.6,2.73,2.73,0,0,0-1.2,2.4c-2.5-3.4-4.9-7.4-4.6-11.4.1,0,.1-.1.2-.1,1.1-.8,3.5-2.7,5.4-3-2.7,1.5-2.7,3.5-2.3,4.7a3.11,3.11,0,0,0,2.6,2.3,4.66,4.66,0,0,0,3.4-1.1,104.22,104.22,0,0,0,5.4,9.9,2.09,2.09,0,0,0,.4.6A6.27,6.27,0,0,0,72.73,221.43Zm1.6,2.1a.75.75,0,0,0,1-.2c.2.3.4.7.6,1l-.1.1a1.67,1.67,0,0,1-2.5,0c-.2-.3-.4-.8-.1-1.1S74,223.33,74.33,223.53Zm4.8,11.3c-.2,0-.3.1-.4.1a1.38,1.38,0,0,0-.4-.3c-.2-.7,0-1.6.9-1.5A.85.85,0,0,1,79.13,234.83Zm-13.3-14.3c-.2-.6-.5-1.4.1-1.8a1,1,0,0,1,1.3.2C67.83,220,66.73,220.73,65.83,220.53Zm.5-14.3s1,2.4,1.3,2.9c-1,.7-2.6,1.8-3.4.2A2.16,2.16,0,0,1,66.33,206.23Zm-46.5,62.2c-1.9.2-3.8.3-5.6.4-1.3,0-5.7-.3-4.6-2.7.5-1.2,2.6-1.5,3.7-1.7,2.2-.5,4.5-.9,6.7-1.5,7.5-1.9,14.9-4.9,20.6-10.3a25.79,25.79,0,0,0,6.6-9.7c1-2.6,1.2-5.6,2.2-8.2,2.1,5.7,6.1,10.4,10.9,14.5a15.08,15.08,0,0,1-5.7,6.8,58.78,58.78,0,0,1-10.4,5.8A81.71,81.71,0,0,1,19.83,268.43Zm32.1-6.9c0,.1-.1.1-.1.2a1.56,1.56,0,0,1-.6,1.2c-.3.2-.8.3-1,0a.45.45,0,0,1,0-.5,10.91,10.91,0,0,0,1.1-.6c.1,0,.1-.1.2-.1a.1.1,0,0,0,.1-.1C51.83,261.63,51.83,261.63,51.93,261.53Zm-10.6,4.9a1.15,1.15,0,0,1-.8,1,1.38,1.38,0,0,1-1.1.1.68.68,0,0,1-.5-.3A22.5,22.5,0,0,0,41.33,266.43Zm-11,3.7h-1.4a64.55,64.55,0,0,0,8.6-2.4.76.76,0,0,0,.2.4,2.73,2.73,0,0,0,2.7.8,2.92,2.92,0,0,0,2.2-1.8,2.44,2.44,0,0,0,0-1.2,5.36,5.36,0,0,0,1.1-.5c1.6-.7,3.3-1.4,5.1-2.3a2.62,2.62,0,0,0,.5.9,2.29,2.29,0,0,0,2.5.3,2.85,2.85,0,0,0,1.4-2.5.66.66,0,0,0-.6-.7c4.3-2.5,8.3-5.7,10.1-9.9,1,.8,2,1.6,3,2.3-.6.9-1.3,1.8-2,2.7a1.83,1.83,0,0,0-2.4-.5c-1,.4-2.1,1.3-1.8,2.5a1.38,1.38,0,0,0,1.3,1.1,38.75,38.75,0,0,1-15.5,8.6A52.82,52.82,0,0,1,30.33,270.13Zm30.5-6.4h0a2.15,2.15,0,0,0-.8,0c-.1,0-.2.1-.3.1.1-.2.2-.5.3-.7a1.91,1.91,0,0,1,.5-1h0a34.5,34.5,0,0,0,6.8-7.5l1.2.9a27.43,27.43,0,0,0-5.3,9.8l-.3-.3c0-.1-.1-.2-.1-.3A1.87,1.87,0,0,0,60.83,263.73Zm2.1,2.9a4.33,4.33,0,0,1-.1.5h-.1v.1a1.88,1.88,0,0,1-.4.9h-.4a1.08,1.08,0,0,1-.9-.2c-.2-.1-.4-.1-.6-.3s-.4-.3-.4-.6a.94.94,0,0,1,1.4-1h0a3.7,3.7,0,0,1,1.1.5C62.63,266.63,62.83,266.73,62.93,266.63Zm-1.6-9.2a1.62,1.62,0,0,1,.9-.5c.2-.1.5-.2.5.1s-.8.5-1.1.5a.7.7,0,0,0-.5.4C61,257.73,61.23,257.53,61.33,257.43Zm-11.7,32.7-.3.3h-.1a.84.84,0,0,1-.7.4h0a4.87,4.87,0,0,1-.7.3l-.1-.1a1.2,1.2,0,0,1-.8-.2.37.37,0,0,1-.2-.5v-.1c-.1-.2-.1-.4.1-.5v-.1a1.5,1.5,0,0,1,1.8-.8q.6-.15.9.6C49.93,289.73,49.83,290,49.63,290.13Zm2-.4v-.4a2.6,2.6,0,0,0-3-1.8,3.37,3.37,0,0,0-2.7,2.3,2.47,2.47,0,0,0,.5,2.2,7.46,7.46,0,0,0-1.2.7,11.31,11.31,0,0,0-2.6,2.3c.6-1.4,1.2-2.7,1.9-4a41.23,41.23,0,0,1,5.2-7.2,3,3,0,0,0,2.8,1.2,2.65,2.65,0,0,0,2.2-2.3,2.14,2.14,0,0,0-1.6-2.2c.6-.5,1.2-1,1.7-1.5a39.71,39.71,0,0,0,1.1,7.7A13.29,13.29,0,0,1,51.63,289.73Zm-.5-7.3a.55.55,0,0,1,.3-.5.37.37,0,0,1,.3-.1l.1-.1h0a1,1,0,0,1,.9.2,1.38,1.38,0,0,1,.3.4v.1a.91.91,0,0,1,0,1,1.09,1.09,0,0,1-.9.4c-.1,0-.2-.1-.3-.1s-.3-.1-.4-.1A1,1,0,0,1,51.13,282.43Zm4.3-10.7h0v.2c0,.1,0,.1-.1.2a.37.37,0,0,1-.1.3c-.1.6-.3,1.1-.4,1.7a21.4,21.4,0,0,1-4.2,4.3,42.58,42.58,0,0,0-6.4,7,43,43,0,0,0-7.4,17.8c-.5,2.9-1.2,6.5-3.8,8.4-2.2,1.6-6.2.7-5.3-2.6.4-1.5,1.5-2.8,2.3-4.2a19.68,19.68,0,0,0,2.1-4.4,36.83,36.83,0,0,0,1.4-9.4c.2-3.5.2-7,1.2-10.4a15.84,15.84,0,0,1,1.9-4.4,7.54,7.54,0,0,1,.6-1.3,10,10,0,0,1,.8-1.4l.1-.1a4,4,0,0,1,1.3-1.6.76.76,0,0,1,.2-.4,1.13,1.13,0,0,1,.8-.5h.2q3.15-.6,6.3-1.5a43.81,43.81,0,0,0,11.3-5.5A25.2,25.2,0,0,0,55.43,271.73Zm12.1,29.2c0-.8.5-1.1,1.2-1.2a.64.64,0,0,1,.6,0c.7.1,1.5.7,1.4,1.5C70.73,303,67.53,302.53,67.53,300.93Zm3.1,2.5a1.76,1.76,0,0,0,.9-.8,2.9,2.9,0,1,0-5.2-2.5,28.91,28.91,0,0,1-8.1-12.8,2.11,2.11,0,0,1-.4-1v-.1c-.1-.1-.1-.2-.1-.4s-.1-.3-.1-.5-.1-.1-.1-.2,0-.1-.1-.2v-.3h0A20.24,20.24,0,0,1,57,282a2.87,2.87,0,0,0,2.7-.2,3,3,0,0,0,1.3-3.6,2.85,2.85,0,0,0-3.2-1.8,4.88,4.88,0,0,0-.7.3v-3.3c.1-.3.1-.6.2-.9h0v-.1a4.25,4.25,0,0,1,.2-1.1,1.69,1.69,0,0,1,.3-1h-.1c.2-.8.5-1.6.7-2.5a3.86,3.86,0,0,0,1.6,1.5,3.1,3.1,0,0,0,1.3.6,2.48,2.48,0,0,0,.9-.1,29.59,29.59,0,0,0,.5,10.7,30.3,30.3,0,0,0,2.2,6.4h-.1c.1.2.3.5.4.7l.6,1.2h0c.1.1.1.3.2.4-.1,0-.1,0-.2.1a1.39,1.39,0,0,1-1.3,1.6c-.8.1-1.8-.6-1.6-1.5v-.1a1.17,1.17,0,0,0-.9-1.1.76.76,0,0,0-.5.2,2.77,2.77,0,0,0,0,1.8c.9,2.5,4,2.4,5.5.5a35.7,35.7,0,0,0,12.2,12.8,23.41,23.41,0,0,0,12.2,3.6A28.12,28.12,0,0,1,70.63,303.43Zm-13.8-24.1a1.28,1.28,0,0,1,1.1-1.2h.4a1.85,1.85,0,0,1,1.2.5,1.2,1.2,0,0,1-.2,1.8,1.4,1.4,0,0,1-1.8.3C57.13,280.63,56.83,279.93,56.83,279.33Zm47.3,17.3c1,1.1-.3,2.5-1.1,3.3a13.94,13.94,0,0,1-4.8,3.2,18.3,18.3,0,0,1-12,.5c-8.5-2.5-14.9-10.2-18.4-18a28.06,28.06,0,0,1,3.1-28.6c.7.5,1.5,1,2.2,1.5l12.7,8.9a17,17,0,0,0-4.4,19,16.18,16.18,0,0,0,8,8.1,16.85,16.85,0,0,0,5.4,1.6c2.2.3,4.3-.2,6.5-.4A4.68,4.68,0,0,1,104.13,296.63Zm-17.6-22.7c.4.2.4.7.2,1.1a1.37,1.37,0,0,1-1.3.6,1,1,0,0,0,0,1.9,4.39,4.39,0,0,0,2.2-.7,30.85,30.85,0,0,0,0,4.3,1.88,1.88,0,0,0-.8-.2,2,2,0,0,0-2,1.5,2.52,2.52,0,0,0,1,2.5,2.75,2.75,0,0,0,2.5.2c.6,2.5,4.2,5.8,7,7.3-6.6,1.4-11.5-6.2-11.8-10.9a14.69,14.69,0,0,1,1.3-7.2A1.42,1.42,0,0,1,86.53,273.93ZM86,272a11.85,11.85,0,0,1,2.5-2.5c.3.2.5.4.8.6-.4,1-.8,2-1.1,3A2.42,2.42,0,0,0,86,272Zm1.3,11.8c-.1.1-.2.2-.3.2a.6.6,0,0,1-.4.1h-.1a1.33,1.33,0,0,1-.8-.3.44.44,0,0,1-.1-.5v-.1c0-.1,0-.2.1-.2s.1-.1.1-.2v-.1c0-.1.1-.1.1-.2a.62.62,0,0,1,.8-.1l.3.3a.76.76,0,0,1,.2.5v.1h0C87.43,283.43,87.53,283.63,87.33,283.83Zm22.5-1c.7-.2,2.5-.9,2.5.3,0,.9-1.4,1.9-1.9,2.4a26.32,26.32,0,0,1-5.2,3.5c-3.9,1.9-8.1,2.1-10.8.6-6.2-3.5-5.9-11.8-3.5-18.4l5.7,4.1a3.25,3.25,0,0,0-.4,1.4,5.66,5.66,0,0,0,2.5,4.5A11.89,11.89,0,0,0,109.83,282.83Zm3.8-34c2,1.1,2.5,4,2.6,6.1a17,17,0,0,1-2,8.6,17.85,17.85,0,0,1-13.9,9.3,1.27,1.27,0,0,0-.9.4c-6.2-4.4-12.4-8.7-18.6-13.1-5.7-4-11.6-7.8-17-12.2h0c-.4-.3-.7-.6-1.1-.9a8,8,0,0,1-1.7-1.5c-3.8-3.4-7.2-7.5-8.8-12.4a18.25,18.25,0,0,1-.7-2.5,1.16,1.16,0,0,0-.2-1,23.68,23.68,0,0,1,1.8-13.9,22.19,22.19,0,0,1,4-6.1c.2,3.9,2.9,7.8,5,10.8A71.4,71.4,0,0,0,96,246.53c5.2,1.9,11,3.7,16.5,2.2h.2A1.53,1.53,0,0,0,113.63,248.83Zm-24.9-9.7a1.8,1.8,0,0,1-1-.2c-.1-.1-.7-.7-.1-.7a.6.6,0,0,0,.6-.3l1.3,1A1.88,1.88,0,0,1,88.73,239.13Zm2.5.9a39.77,39.77,0,0,0,5,2.7,1.57,1.57,0,0,0-1,1.1c0,.1-.1.3-.1.4-2.4-1-4.8-2.1-7.1-3.3A3.72,3.72,0,0,0,91.23,240Zm6.1,4.3c.1,0,.3-.1.4-.1a1.7,1.7,0,0,1,1,0c.4.1,1.1.7.5,1.1q-.3.15-.3.3a1.85,1.85,0,0,0-.7-.2,6.9,6.9,0,0,1-.8-.3A2,2,0,0,0,97.33,244.33Zm4,.2a31.1,31.1,0,0,0,9.1,1.1c.1,0,.2-.1.3-.1l1.8-.3a15.06,15.06,0,0,1-3.5,1.4c-1.2.3-2.4.3-3.6.6a36.32,36.32,0,0,1-4.5-1A2.54,2.54,0,0,0,101.33,244.53Zm15.5-7.1c-.6,1.7-1.7,3.9-3.4,4.9h-.2c-10.7,1.6-20.9-4-28.1-11.5a69.38,69.38,0,0,1-9.2-12.5c-2.6-4.5-5.6-9.9-7.9-14.6,3.9-1.9,9.1-2.2,13.4-2a27.83,27.83,0,0,1,12,3.5,18,18,0,0,0,5.2,10.1,20.11,20.11,0,0,0,5.5,3.6,14.08,14.08,0,0,0,3.1,1h0c1.7,0,3.5.1,5-.7a27.06,27.06,0,0,0,2.1-3.7,10,10,0,0,1,.8,1.4,25.44,25.44,0,0,1,1.6,3.8,28.15,28.15,0,0,1,1.4,8.6A18.91,18.91,0,0,1,116.83,237.43Z\"/><path class=\"cls-5\" d=\"M83.23,18.13c-2.2-.6-3.8,1-4.2,3.1-.6,3,2.5,7.5-1.1,9.3l-.1.1c-2.9-7,4.5-13.6,5.8-20.2.9-4.6-1.6-10.9-7.2-10.4-5.9.5-7.7,7.2-6.9,12.1.6,3.7,2.6,8.5,2.8,12.7a14.05,14.05,0,0,0-4.7-7.3c-2.4-2.2-7-6.5-10.4-3.7-3.1,2.5-.6,6.7,2.2,8.1,2.2,1,4.6,1.1,6.9,1.6,1.8.4,4.3,1.7,4.9,3.5a8.75,8.75,0,0,1-.2,1.6V29c-.1.2-.2.3-.3.5a.64.64,0,0,0,.3,1,8.9,8.9,0,0,1-1.9,2c-.6.5-.1,1.5.6,1.1,4.5-2.8,4.6-8.5,3.5-13.1C71.93,15,67.73,5.23,75,2c3.3-1.4,6.3,1.1,7.1,4.2.9,3.5-.7,7-2.3,10-2.6,4.9-5.8,10.2-3.1,15.8.3.7,1.2.3,1.3-.3.1,0,.2.1.3,0,.4-.1.7-.2,1-.3a2.51,2.51,0,0,0,2.3,2.5c.8.1,1-1.3.2-1.4-3.1-.5,1.1-4.2,1.8-5a9.73,9.73,0,0,0,2.1-3.3C86.53,21.53,85.73,18.83,83.23,18.13Zm-23.5,2.2c-2.1-1.1-4.2-5-.8-5.9,2.4-.6,4.6,1.6,6.3,2.9a16.08,16.08,0,0,1,5.1,6.2h0C67.33,21.23,63.13,22,59.73,20.33ZM81,27.53v-.8c-.2-1.7-1-3.4-.7-5.1.5-2.7,3.7-2.6,4.1.1S82.73,25.83,81,27.53Z\"/><ellipse class=\"cls-6\" cx=\"58.43\" cy=\"53.93\" rx=\"6.4\" ry=\"2.2\"/><ellipse class=\"cls-6\" cx=\"95.53\" cy=\"38.73\" rx=\"2.6\" ry=\"7.6\" transform=\"translate(42.91 127.38) rotate(-81.38)\"/><ellipse class=\"cls-6\" cx=\"38.63\" cy=\"46.71\" rx=\"6.4\" ry=\"2.2\" transform=\"translate(-11.76 13.01) rotate(-16.64)\"/><ellipse class=\"cls-6\" cx=\"61.62\" cy=\"37.93\" rx=\"8.2\" ry=\"2.8\" transform=\"translate(-3.28 5.93) rotate(-5.37)\"/><ellipse class=\"cls-6\" cx=\"121.32\" cy=\"48.86\" rx=\"2.2\" ry=\"6.4\" transform=\"translate(25.52 137.9) rotate(-64.84)\"/><ellipse class=\"cls-6\" cx=\"90.93\" cy=\"51.73\" rx=\"4.8\" ry=\"1.6\"/><path class=\"cls-3\" d=\"M85,144.13a5.5,5.5,0,0,0-.7-.9,2.15,2.15,0,0,0-3.1-2.6c-.1.1-.2.1-.3.2a.9.9,0,0,0-.5-.1,3.3,3.3,0,0,0-2.2.2c-1.6.3-3.3,1-3.3,2.9-.1,2.2,2,3.3,3.9,3.4h.1a3.53,3.53,0,0,0,1.4-.3,7.62,7.62,0,0,0,3.3.2C85.23,146.73,85.83,145.43,85,144.13Z\"/><path class=\"cls-5\" d=\"M86,141.43c-.2-.4-.3-.7-.5-1.1a1.38,1.38,0,0,0-.6-1.1c-.1-.2-.3-.3-.4-.5h0a13.42,13.42,0,0,0-8.2-4.8,1.06,1.06,0,0,0-.5,2,43.43,43.43,0,0,1,4.3,2.4c-3.6.3-8.3,1.9-7.5,6.5.7,4.1,5.2,5.5,8.7,4.4S87.63,145.13,86,141.43Zm-3,3.7c-1.5,1.7-5,2.5-6.8,1a2.44,2.44,0,0,1-.4-3.5c1.1-1.2,3.1-1.1,4.6-1.3,1.8-.2,2.2-.2,3.2.7S84,143.93,83,145.13Z\"/><ellipse class=\"cls-7\" cx=\"114.16\" cy=\"120.53\" rx=\"21\" ry=\"13.4\" transform=\"translate(-23.94 212.67) rotate(-80.26)\"/><ellipse class=\"cls-8\" cx=\"113.28\" cy=\"124.63\" rx=\"14.3\" ry=\"9.2\" transform=\"translate(-28.71 215.2) rotate(-80.26)\"/><ellipse class=\"cls-7\" cx=\"108.93\" cy=\"122.1\" rx=\"5.5\" ry=\"3.5\" transform=\"translate(-29.83 208.81) rotate(-80.26)\"/><ellipse class=\"cls-7\" cx=\"39.63\" cy=\"122.04\" rx=\"13.4\" ry=\"21\" transform=\"translate(-26.05 11.81) rotate(-12.8)\"/><ellipse class=\"cls-8\" cx=\"40.63\" cy=\"125.34\" rx=\"9.2\" ry=\"14.3\" transform=\"translate(-26.75 12.11) rotate(-12.8)\"/><ellipse class=\"cls-7\" cx=\"44.43\" cy=\"122.03\" rx=\"3.5\" ry=\"5.5\" transform=\"matrix(0.98, -0.22, 0.22, 0.98, -25.93, 12.87)\"/><path class=\"cls-1\" d=\"M130.73,152.13c0,13.4-30.2-19.1-51.8-20.2-30.1-1.5-57.4,33.5-57.4,20.2s24.4-25.3,54.6-25.3S130.73,138.83,130.73,152.13Z\"/><path class=\"cls-4\" d=\"M121.33,136.23c-11.8-5.5-28.4-10.6-45-10.6s-33.2,5-44.9,10.9c-.7.3-.4,1.7.3,1.4,11.9-5.1,32.4-10.1,45-10.2s32.3,5.1,44.2,10.4C121.83,138.53,122.23,136.63,121.33,136.23Z\"/><path class=\"cls-5\" d=\"M129,81.73a10.7,10.7,0,0,0-8.7-7.4c-3.3-.4-7.9.8-9.2,4.2-.3.8.7,1.3,1.3,1,2.5-1.1,4.3-2.8,7.3-2.4a7.9,7.9,0,0,1,6.5,5.4C126.93,84.33,129.73,83.53,129,81.73Z\"/><path class=\"cls-5\" d=\"M42.63,79.23c-3.2-2.7-8.3-2.8-12.2-1.7-3.4,1-8.1,3.5-7.6,7.7.2,1.8,3.1,1.9,2.9,0-.4-3.6,5.5-5.2,8.1-5.5s5.1.6,7.7,1.2C42.53,81.23,43.53,80,42.63,79.23Z\"/></g></g></svg>"

/***/ }),

/***/ "542b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmbettyVideo_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("25e1");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmbettyVideo_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmbettyVideo_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmbettyVideo_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5a2b":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("eaeb");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("605c4440", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "6086":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, "\n.embetty-tweet article p a {\n  color: #2b7bb9;\n  text-decoration: none;\n}\n.embetty-tweet article p a:hover {\n    color: #3b94d9;\n}\n.embetty-tweet article p a:focus {\n    text-decoration: underline;\n}\n", ""]);

// exports


/***/ }),

/***/ "679d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmbettyTweet_vue_vue_type_style_index_0_id_2941da65_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b726");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmbettyTweet_vue_vue_type_style_index_0_id_2941da65_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmbettyTweet_vue_vue_type_style_index_0_id_2941da65_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmbettyTweet_vue_vue_type_style_index_0_id_2941da65_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "6b54":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("3846");
var anObject = __webpack_require__("cb7c");
var $flags = __webpack_require__("0bfb");
var DESCRIPTORS = __webpack_require__("9e1e");
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__("2aba")(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__("79e5")(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7f7f":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("9e1e") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "96cf":
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a481":
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__("214f")('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),

/***/ "a691":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmbettyTweet_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("131e");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmbettyTweet_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmbettyTweet_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmbettyTweet_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "a94b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmbettyVideo_vue_vue_type_style_index_0_id_c5897cae_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5a2b");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmbettyVideo_vue_vue_type_style_index_0_id_c5897cae_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmbettyVideo_vue_vue_type_style_index_0_id_c5897cae_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmbettyVideo_vue_vue_type_style_index_0_id_c5897cae_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "b54a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__("386b")('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),

/***/ "b726":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("2f5a");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("41ad994f", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "de7a":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, "\n.embetty-video iframe {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n", ""]);

// exports


/***/ }),

/***/ "eaeb":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, "\n.embetty-video[data-v-c5897cae] {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  max-width: 100%;\n  font-family: var(--embetty-font-family, Helvetica, Roboto, \"Segoe UI\", Calibri, sans-serif);\n  border: 1px solid var(--embetty-border-color, #ccc);\n  border-width: 1px;\n  border-radius: 4px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  font-size: 16px;\n  line-height: 1;\n}\n.embetty-video .poster[data-v-c5897cae], .embetty-video .wrapper[data-v-c5897cae] {\n    position: relative;\n    overflow: hidden;\n    background: no-repeat center black;\n    background-size: cover;\n}\n.embetty-video .poster.contain[data-v-c5897cae], .embetty-video .wrapper.contain[data-v-c5897cae] {\n      background-size: contain;\n}\n.embetty-video .poster.default-height[data-v-c5897cae], .embetty-video .wrapper.default-height[data-v-c5897cae] {\n      height: 0;\n      padding-top: 56.25%;\n}\n.embetty-video .playbutton[data-v-c5897cae],\n  .embetty-video .playbutton[data-v-c5897cae]:active {\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    display: block;\n    position: absolute;\n    z-index: 1;\n    width: 100%;\n    height: 100%;\n    border: 0;\n    padding: 0;\n    outline: 0;\n    opacity: 0.9;\n    background: none;\n    cursor: pointer;\n    background-image: -webkit-gradient(linear, left top, left bottom, from(transparent), to(#000));\n    background-image: linear-gradient(transparent, #000);\n    -webkit-transition: opacity 150ms;\n    transition: opacity 150ms;\n}\n.embetty-video .playbutton[data-v-c5897cae]:hover, .embetty-video .playbutton[data-v-c5897cae]:focus,\n    .embetty-video .playbutton[data-v-c5897cae]:active:hover,\n    .embetty-video .playbutton[data-v-c5897cae]:active:focus {\n      opacity: 1;\n}\n.embetty-video .playicon[data-v-c5897cae] {\n    width: 100px;\n    height: 100px;\n}\n.embetty-video .powered-by[data-v-c5897cae] {\n    position: absolute;\n    z-index: 3;\n    right: -20px;\n    bottom: 0px;\n    padding: 20px 46px 5px 20px;\n    font-size: 14px;\n    color: #777;\n    text-decoration: none;\n    opacity: .3;\n    -webkit-font-smoothing: antialiased;\n    color: #fff;\n    opacity: .6;\n}\n.embetty-video .powered-by[data-v-c5897cae]:hover, .embetty-video .powered-by[data-v-c5897cae]:focus {\n      opacity: 1;\n}\n.embetty-video .powered-by .embetty-logo[data-v-c5897cae] {\n      position: absolute;\n      right: 0;\n      bottom: -42px;\n      width: 40px;\n}\n", ""]);

// exports


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
var setPublicPath = __webpack_require__("1eb2");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"/home/flo/www/embetty/embetty-vue/node_modules/.cache/vue-loader","cacheIdentifier":"6747c6f6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmbettyTweet.vue?vue&type=template&id=2941da65&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:{'embetty-tweet': true, answered: _vm.answered}},[(_vm.fetched)?[(_vm.isReply)?_c('embetty-tweet',{attrs:{"status":_vm.answeredTweetId,"answered":true}}):_vm._e(),_c('header',[_c('img',{attrs:{"src":_vm.profileImageUrl}}),_c('span',[_c('strong',[_vm._v(_vm._s(_vm.userName))]),_c('a',{attrs:{"href":("https://twitter.com/" + _vm.screenName),"target":"_blank","rel":"noopener"}},[_vm._v("@"+_vm._s(_vm.screenName))])])]),_c('article',[_c('p',{domProps:{"innerHTML":_vm._s(_vm.fullText)}}),(_vm.media.length > 0)?_c('section',{class:("media media-" + (_vm.media.length))},_vm._l((_vm.media),function(med){return _c('a',{key:med.imageUrl,attrs:{"href":med.imageUrl,"target":"_blank"}},[_c('img',{attrs:{"src":med.imageUrl}})])})):_vm._e(),(_vm.links.length > 0)?_c('a',{ref:"link",staticClass:"links",attrs:{"href":_vm.link.url,"target":"_blank","rel":"noopener"}},[_c('img',{attrs:{"src":_vm.linkImageUrl}}),_c('section',{ref:"linkBody",staticClass:"link-body"},[_c('h3',[_vm._v(_vm._s(_vm.link.title))]),(_vm.linkDescription)?_c('p',[_vm._v(_vm._s(_vm.linkDescription))]):_vm._e(),(_vm.linkHostname)?_c('span',[_vm._v(_vm._s(_vm.linkHostname))]):_vm._e()])]):_vm._e(),_c('a',{staticClass:"created-at",attrs:{"href":_vm.twitterUrl,"target":"_blank","rel":"noopener"}},[_c('time',{attrs:{"datetime":_vm.createdAt.toISOString()}},[_vm._v(_vm._s(_vm.createdAt.toLocaleString()))]),_vm._v("\n        via Twitter\n        "),_c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 400 400"}},[_c('path',{staticStyle:{"fill":"#1da1f2"},attrs:{"d":"M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"}})])]),_c('a',{staticClass:"powered-by",attrs:{"href":"https://www.heise.de/embetty?wt_mc=link.embetty.poweredby","target":"_blank","rel":"noopener","title":"embetty - displaying remote content without compromising your privacy."}},[_vm._v("\n        powered by "),_c('span',{staticClass:"embetty-logo",domProps:{"innerHTML":_vm._s(_vm.embettyLogo)}})])])]:_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/EmbettyTweet.vue?vue&type=template&id=2941da65&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.link.js
var es6_string_link = __webpack_require__("b54a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.match.js
var es6_regexp_match = __webpack_require__("4917");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/asyncToGenerator.js
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }

      function _next(value) {
        step("next", value);
      }

      function _throw(err) {
        step("throw", err);
      }

      _next();
    });
  };
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.to-string.js
var es6_regexp_to_string = __webpack_require__("6b54");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmbettyEmbed.vue?vue&type=script&lang=js&




// eslint-disable-next-line
var EMBETTY_LOGO = __webpack_require__("4e4b").toString();

/* harmony default export */ var EmbettyEmbedvue_type_script_lang_js_ = ({
  name: 'embetty-embed',
  props: {
    serverUrl: {
      type: String,
      required: false,
      default: null
    }
  },
  data: function data() {
    return {
      embettyLogo: EMBETTY_LOGO,
      fetched: false,
      data: undefined
    };
  },
  computed: {
    /**
     * Override this in child components!
     * @returns {string | undefined}
     */
    url: function url() {
      return undefined;
    },

    /**
     * @returns {!string}
     */
    _serverUrl: function _serverUrl() {
      if (this.serverUrl) {
        return this.serverUrl;
      }

      console.log(this._embettyVueOptions, 'use');

      if (!this._embettyVueOptions.serverUrl) {
        throw new Error("serverUrl is neither set directly on the ".concat(this.$vnode.tag, " component nor globally."));
      }

      return this._embettyVueOptions.serverUrl;
    }
  },
  watch: {
    url: {
      immediate: true,
      handler: function handler(url) {
        if (url) {
          this.fetchData();
        }
      }
    }
  },
  methods: {
    /**
     * Calls the API of embetty-server using the url set in the calling (child) component.
     */
    fetchData: function () {
      var _fetchData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return window.fetch(this.url);

              case 2:
                response = _context.sent;
                _context.next = 5;
                return response.json();

              case 5:
                this.data = _context.sent;
                this.fetched = true;

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function fetchData() {
        return _fetchData.apply(this, arguments);
      };
    }(),

    /**
     * @param {?string} url
     * @returns {?string} The given URL, prepended with the embetty-server base URL.
     */
    _api: function _api(url) {
      return url ? "".concat(this._serverUrl).concat(url) : undefined;
    }
  }
});
// CONCATENATED MODULE: ./src/components/EmbettyEmbed.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_EmbettyEmbedvue_type_script_lang_js_ = (EmbettyEmbedvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/EmbettyEmbed.vue
var EmbettyEmbed_render, EmbettyEmbed_staticRenderFns




/* normalize component */

var component = normalizeComponent(
  components_EmbettyEmbedvue_type_script_lang_js_,
  EmbettyEmbed_render,
  EmbettyEmbed_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var EmbettyEmbed = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmbettyTweet.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var LINK_IMAGE_SIZE = 125;
var MIN_WINDOW_WIDTH = 600;
/* harmony default export */ var EmbettyTweetvue_type_script_lang_js_ = ({
  name: 'embetty-tweet',
  extends: EmbettyEmbed,
  props: {
    status: {
      type: String,
      required: true,
      validator: function validator(statusId) {
        return /^\d{6,}$/.test(statusId);
      }
    },
    answered: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: function data() {
    return {
      linkDescription: null
    };
  },
  computed: {
    /**
     * @override
     * @returns {string}
     */
    url: function url() {
      return this._api("/tweet/".concat(this.status));
    },

    /**
     * @returns {string}
     */
    userName: function userName() {
      return this.data.user.name;
    },

    /**
     * @returns {string}
     */
    screenName: function screenName() {
      return this.data.user.screen_name;
    },

    /**
     * @returns {string}
     */
    fullText: function fullText() {
      var _this = this;

      return this.data.full_text.replace(/(https:\/\/[^\s]+)/g, function (link) {
        if (_this.media.length > 0 && _this.media[0].url === link) {
          return '';
        }

        return "<a href=\"".concat(link, "\">").concat(link, "</a>");
      }).replace(/#(\w+)/g, function (hashtag, word) {
        return "<a href=\"https://twitter.com/hashtag/".concat(word, "\">").concat(hashtag, "</a>");
      }).replace(/@(\w+)/g, function (name, word) {
        return "<a href=\"https://twitter.com/".concat(word, "\">").concat(name, "</a>");
      });
    },

    /**
     * @returns {any[]}
     */
    media: function media() {
      var _this2 = this;

      var extended = this.data.extended_entities || {};
      var media = extended.media || [];
      return media.map(function (m, idx) {
        m.imageUrl = "".concat(_this2.url, "-images-").concat(idx);
        return m;
      });
    },

    /**
     * @returns {any[]}
     */
    links: function links() {
      return this.data.entities.urls || [];
    },

    /**
     * @returns {any}
     */
    link: function link() {
      return this.links[0];
    },

    /**
     * @returns {string}
     */
    linkImageUrl: function linkImageUrl() {
      return "".concat(this.url, "-link-image");
    },

    /**
     * @returns {string | undefined}
     */
    linkHostname: function linkHostname() {
      // adapted from https://stackoverflow.com/a/21553982/451391
      var match = this.link.url.match(/^.*?\/\/(([^:/?#]*)(?::([0-9]+))?)/);
      return match ? match[2] : undefined;
    },

    /**
     * @returns {string}
     */
    profileImageUrl: function profileImageUrl() {
      return "".concat(this.url, "-profile-image");
    },

    /**
     * @returns {Date}
     */
    createdAt: function createdAt() {
      var createdAt = this.data.created_at.replace(/\+\d{4}\s/, '');
      return new Date(createdAt);
    },

    /**
     * @returns {string}
     */
    twitterUrl: function twitterUrl() {
      return "https://twitter.com/statuses/".concat(this.data.id_str);
    },

    /**
     * @returns {string}
     */
    answeredTweetId: function answeredTweetId() {
      return this.data.in_reply_to_status_id_str;
    },

    /**
     * @returns {boolean}
     */
    isReply: function isReply() {
      return !!this.answeredTweetId;
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.$watch('fetched', function (fetched) {
      if (fetched) {
        _this3.fitLinkDescription();
      }
    }, {
      immediate: true
    });

    if (window) {
      window.addEventListener('resize', function () {
        if (window.innerWidth < MIN_WINDOW_WIDTH) {
          return;
        }

        _this3.fitLinkDescription();
      });
    }
  },
  methods: {
    fitLinkDescription: function fitLinkDescription() {
      var _this4 = this;

      if (!this.link || !window) {
        return;
      } // reset link description to the one returned by the API


      this.linkDescription = this.link.description;

      if (!this.linkDescription) {
        return;
      }
      /** @type Element */


      var section = this.$refs.link;
      /** @type Element */

      var linkBody = this.$refs.linkBody; // don't do anything if the mobile view is active

      if (section.clientWidth === linkBody.clientWidth) {
        return;
      }

      var imgHeight = LINK_IMAGE_SIZE;
      var counter = 0;
      var last = '';
      var computedStyle = window.getComputedStyle(section);

      var sectionHeight = function sectionHeight() {
        var elemMarginTop = parseFloat(computedStyle.getPropertyValue('margin-top'));
        var elemarginBottom = parseFloat(computedStyle.getPropertyValue('margin-bottom'));
        var elemHeight = parseFloat(computedStyle.getPropertyValue('height'));
        return elemHeight + elemMarginTop + elemarginBottom;
      };

      var reduceLinkDescriptionLength = function reduceLinkDescriptionLength() {
        if (counter >= 200 || last === _this4.linkDescription) {
          return;
        }

        if (sectionHeight() - 2 <= imgHeight) {
          return;
        }

        last = _this4.linkDescription;
        _this4.linkDescription = _this4.linkDescription.replace(/\W*\s(\S)*$/, '…');
        counter++; // wait for Vue to render until we measure again

        _this4.$nextTick(reduceLinkDescriptionLength);
      };

      this.$nextTick(reduceLinkDescriptionLength);
    }
  }
});
// CONCATENATED MODULE: ./src/components/EmbettyTweet.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_EmbettyTweetvue_type_script_lang_js_ = (EmbettyTweetvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/EmbettyTweet.vue?vue&type=style&index=0&id=2941da65&lang=scss&scoped=true&
var EmbettyTweetvue_type_style_index_0_id_2941da65_lang_scss_scoped_true_ = __webpack_require__("679d");

// EXTERNAL MODULE: ./src/components/EmbettyTweet.vue?vue&type=style&index=1&lang=scss&
var EmbettyTweetvue_type_style_index_1_lang_scss_ = __webpack_require__("a691");

// CONCATENATED MODULE: ./src/components/EmbettyTweet.vue







/* normalize component */

var EmbettyTweet_component = normalizeComponent(
  components_EmbettyTweetvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "2941da65",
  null
  
)

/* harmony default export */ var EmbettyTweet = (EmbettyTweet_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"/home/flo/www/embetty/embetty-vue/node_modules/.cache/vue-loader","cacheIdentifier":"6747c6f6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmbettyVideo.vue?vue&type=template&id=c5897cae&scoped=true&
var EmbettyVideovue_type_template_id_c5897cae_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"embetty-video",style:({ 'width': _vm.width === null ? null : (_vm.width + "px") })},[(_vm.activated)?_c('div',{class:{
      'wrapper': true,
      'default-height': _vm.height === null
    },style:({
      'height': _vm.height === null ? null : (_vm.height + "px")
    }),domProps:{"innerHTML":_vm._s(_vm.iframe)}}):[_c('button',{staticClass:"playbutton",attrs:{"type":"button"},on:{"click":_vm.activate}},[_c('svg',{staticClass:"playicon",attrs:{"viewBox":"0 0 200 200"}},[_c('circle',{attrs:{"cx":"100","cy":"100","r":"90","fill":"none","stroke-width":"15","stroke":"#fff"}}),_c('polygon',{attrs:{"points":"70, 55 70, 145 145, 100","fill":"#fff"}})])]),_c('div',{class:{
        'poster': true,
        'default-height': _vm.height === null,
        'contain': _vm.posterImageMode === 'contain'
      },style:({
        'backgroundImage': _vm.posterImageUrl ? ("url(" + _vm.posterImageUrl + ")"): null,
        'height': _vm.height === null ? null : (_vm.height + "px")
      })}),_c('a',{staticClass:"powered-by",attrs:{"href":"https://www.heise.de/embetty","target":"_blank","rel":"noopener","title":"embetty - displaying remote content without compromising your privacy."}},[_vm._v("\n      powered by "),_c('span',{staticClass:"embetty-logo",domProps:{"innerHTML":_vm._s(_vm.embettyLogo)}})])]],2)}
var EmbettyVideovue_type_template_id_c5897cae_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/EmbettyVideo.vue?vue&type=template&id=c5897cae&scoped=true&

// CONCATENATED MODULE: ./src/components/video-impl/FacebookVideo.js
/** @type VideoImpl */
var FacebookVideo = {
  /**
   * @param {!string} videoId
   * @returns {?string}
   */
  getVideoDataApiEndpoint: function getVideoDataApiEndpoint(videoId) {
    return "/video/facebook/".concat(videoId);
  },

  /**
   * @param {!string} videoId
   * @returns {!string}
   */
  getPosterImageApiEndpoint: function getPosterImageApiEndpoint(videoId) {
    return "/video/facebook/".concat(videoId, "-poster-image");
  },

  /**
   * @param {VideoData} videoData
   * @returns {string}
   */
  getIframe: function getIframe(videoData) {
    var canonicalUrl = encodeURIComponent(videoData.serverData.canonicalUrl);
    var iframeSrc = "https://www.facebook.com/plugins/video.php?href=".concat(canonicalUrl) + "&show_text=0&autoplay=1&mute=0&width=".concat(videoData.width);
    return "<iframe\n      src=\"".concat(iframeSrc, "\"\n      width=\"").concat(videoData.width, "\"\n      height=\"").concat(videoData.height, "\"\n      style=\"border:none;overflow:hidden\"\n      scrolling=\"no\"\n      frameborder=\"0\"\n      allowTransparency=\"true\"\n      allowFullScreen=\"true\"></iframe>");
  }
};
/* harmony default export */ var video_impl_FacebookVideo = (FacebookVideo);
// CONCATENATED MODULE: ./src/components/video-impl/VimeoVideo.js
/** @type VideoImpl */
var VimeoVideo = {
  /**
   * @param {!string} videoId
   * @returns {?string}
   */
  getVideoDataApiEndpoint: function getVideoDataApiEndpoint(videoId) {
    return undefined;
  },

  /**
   * @param {!string} videoId
   * @returns {!string}
   */
  getPosterImageApiEndpoint: function getPosterImageApiEndpoint(videoId) {
    return "/video/vimeo/".concat(videoId, "-poster-image");
  },

  /**
   * @param {VideoData} videoData
   * @returns {string}
   */
  getIframe: function getIframe(videoData) {
    return "<iframe\n      src=\"https://player.vimeo.com/video/".concat(videoData.videoId, "?autoplay=1#t=").concat(videoData.startAt, "\"\n      width=\"").concat(videoData.width, "\"\n      height=\"").concat(videoData.height, "\"\n      frameborder=\"0\"\n      webkitallowfullscreen\n      mozallowfullscreen\n      allowfullscreen></iframe>\n    ");
  }
};
/* harmony default export */ var video_impl_VimeoVideo = (VimeoVideo);
// CONCATENATED MODULE: ./src/components/video-impl/YoutubeVideo.js
/** @type VideoImpl */
var YoutubeVideo = {
  /**
   * @param {!string} videoId
   * @returns {?string}
   */
  getVideoDataApiEndpoint: function getVideoDataApiEndpoint(videoId) {
    return undefined;
  },

  /**
   * @param {!string} videoId
   * @returns {!string}
   */
  getPosterImageApiEndpoint: function getPosterImageApiEndpoint(videoId) {
    return "/video/youtube/".concat(videoId, "-poster-image");
  },

  /**
   * @param {VideoData} videoData
   * @returns {string}
   */
  getIframe: function getIframe(videoData) {
    return "<iframe\n      type=\"text/html\"\n      width=\"".concat(videoData.width, "\"\n      height=\"").concat(videoData.height, "\"\n      src=\"//www.youtube-nocookie.com/embed/").concat(videoData.videoId, "?autoplay=1&start=").concat(videoData.startAt, "\"\n      frameborder=\"0\"></iframe>");
  }
};
/* harmony default export */ var video_impl_YoutubeVideo = (YoutubeVideo);
// CONCATENATED MODULE: ./src/components/video-impl/index.js



var videoImplementations = {
  facebook: video_impl_FacebookVideo,
  vimeo: video_impl_VimeoVideo,
  youtube: video_impl_YoutubeVideo
};
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmbettyVideo.vue?vue&type=script&lang=ts&

















































































































/* harmony default export */ var EmbettyVideovue_type_script_lang_ts_ = ({
  name: 'embetty-video',
  extends: EmbettyEmbed,
  props: {
    width: {
      type: Number,
      required: false,
      default: null
    },
    height: {
      type: Number,
      required: false,
      default: null
    },
    type: {
      type: String,
      required: true,
      validator(videoType) {
        return Object.keys(videoImplementations).includes(videoType);
      }
    },
    videoId: {
      type: String,
      required: true,
      validator(videoId) {
        return /^[a-zA-Z0-9_-]{6,}$/.test(videoId);
      }
    },
    startAt: {
      type: Number,
      required: false,
      default: 0,
      validator(startAt) {
        return startAt % 1 === 0;
      }
    },
    posterImageMode: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      activated: false
    };
  },
  computed: {
    /**
     * @returns {VideoImpl}
     */
    impl() {
      if (!(this.type in videoImplementations)) {
        throw new Error(`Could not find video implementation for type ${this.type}. Please specify a valid video type.`);
      }

      return videoImplementations[this.type];
    },

    /**
     * @returns {string | undefined}
     */
    posterImageUrl() {
      return this._api(this.impl.getPosterImageApiEndpoint(this.videoId));
    },

    /**
     * @returns {string}
     */
    _posterImageMode() {
      return this.posterImageMode || this._embettyVueOptions.posterImageMode || 'cover';
    },

    /**
     * @override
     * @returns {string | undefined}
     */
    url() {
      return this._api(this.impl.getVideoDataApiEndpoint(this.videoId));
    },

    /**
     * @returns {string}
     */
    iframe() {
      return this.impl.getIframe({
        width: this.width || 1600,
        height: this.height || 900,
        videoId: this.videoId,
        startAt: this.startAt,
        serverData: this.data
      });
    }
  },
  mounted() {
    this.$nextTick(() => console.log('mounted video', this, this._embettyVueOptions));
  },
  methods: {
    activate() {
      this.activated = true;
      this.$emit(`activated`);
    }
  }
});

// CONCATENATED MODULE: ./src/components/EmbettyVideo.vue?vue&type=script&lang=ts&
 /* harmony default export */ var components_EmbettyVideovue_type_script_lang_ts_ = (EmbettyVideovue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/EmbettyVideo.vue?vue&type=style&index=0&id=c5897cae&lang=scss&scoped=true&
var EmbettyVideovue_type_style_index_0_id_c5897cae_lang_scss_scoped_true_ = __webpack_require__("a94b");

// EXTERNAL MODULE: ./src/components/EmbettyVideo.vue?vue&type=style&index=1&lang=scss&
var EmbettyVideovue_type_style_index_1_lang_scss_ = __webpack_require__("542b");

// CONCATENATED MODULE: ./src/components/EmbettyVideo.vue







/* normalize component */

var EmbettyVideo_component = normalizeComponent(
  components_EmbettyVideovue_type_script_lang_ts_,
  EmbettyVideovue_type_template_id_c5897cae_scoped_true_render,
  EmbettyVideovue_type_template_id_c5897cae_scoped_true_staticRenderFns,
  false,
  null,
  "c5897cae",
  null
  
)

/* harmony default export */ var EmbettyVideo = (EmbettyVideo_component.exports);
// CONCATENATED MODULE: ./src/install.js


var Plugin = {
  /**
   * @param {VueConstructor} Vue
   * @param {EmbettyVueOptions} options
   */
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    Vue.component('embetty-tweet', EmbettyTweet);
    Vue.component('embetty-video', EmbettyVideo);
    Vue.prototype._embettyVueOptions = options;
  }
}; // auto install

if (typeof window !== 'undefined' && window.hasOwnProperty('Vue')) {
  var baseUrlMeta = document.querySelector('meta[data-embetty-server]');
  /** @type EmbettyVueOptions */

  var embettyVueOptions = {
    serverUrl: baseUrlMeta !== null ? baseUrlMeta.getAttribute('data-embetty-server') : undefined
  };
  window.Vue.use(Plugin, embettyVueOptions);
}

/* harmony default export */ var src_install = (Plugin);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src_install);



/***/ })

/******/ })["default"];
//# sourceMappingURL=embetty-vue.common.js.map