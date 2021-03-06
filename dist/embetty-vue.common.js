'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global_1 =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

var fails = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var descriptors = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

var objectPropertyIsEnumerable = {
	f: f
};

var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var toString = {}.toString;

var classofRaw = function (it) {
  return toString.call(it).slice(8, -1);
};

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings



var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it));
};

var isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var toPrimitive = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var hasOwnProperty = {}.hasOwnProperty;

var has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var document$1 = global_1.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document$1) && isObject(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
};

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !descriptors && !fails(function () {
  return Object.defineProperty(documentCreateElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};

var objectGetOwnPropertyDescriptor = {
	f: f$1
};

var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (ie8DomDefine) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var objectDefineProperty = {
	f: f$2
};

var createNonEnumerableProperty = descriptors ? function (object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var setGlobal = function (key, value) {
  try {
    createNonEnumerableProperty(global_1, key, value);
  } catch (error) {
    global_1[key] = value;
  } return value;
};

var SHARED = '__core-js_shared__';
var store = global_1[SHARED] || setGlobal(SHARED, {});

var sharedStore = store;

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof sharedStore.inspectSource != 'function') {
  sharedStore.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource = sharedStore.inspectSource;

var WeakMap = global_1.WeakMap;

var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

var shared = createCommonjsModule(function (module) {
(module.exports = function (key, value) {
  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.4',
  mode:  'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});
});

var id = 0;
var postfix = Math.random();

var uid = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var keys = shared('keys');

var sharedKey = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys = {};

var WeakMap$1 = global_1.WeakMap;
var set, get, has$1;

var enforce = function (it) {
  return has$1(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (nativeWeakMap) {
  var store$1 = new WeakMap$1();
  var wmget = store$1.get;
  var wmhas = store$1.has;
  var wmset = store$1.set;
  set = function (it, metadata) {
    wmset.call(store$1, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store$1, it) || {};
  };
  has$1 = function (it) {
    return wmhas.call(store$1, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return has(it, STATE) ? it[STATE] : {};
  };
  has$1 = function (it) {
    return has(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has$1,
  enforce: enforce,
  getterFor: getterFor
};

var redefine = createCommonjsModule(function (module) {
var getInternalState = internalState.get;
var enforceInternalState = internalState.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global_1) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});
});

var path = global_1;

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
};

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
var toInteger = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
var toLength = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

var indexOf = arrayIncludes.indexOf;


var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return objectKeysInternal(O, hiddenKeys$1);
};

var objectGetOwnPropertyNames = {
	f: f$3
};

var f$4 = Object.getOwnPropertySymbols;

var objectGetOwnPropertySymbols = {
	f: f$4
};

// all object keys, includes non-enumerable and symbols
var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = objectGetOwnPropertyNames.f(anObject(it));
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var copyConstructorProperties = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = objectDefineProperty.f;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

var isForced_1 = isForced;

var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global_1;
  } else if (STATIC) {
    target = global_1[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global_1[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$1(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};

var defineProperty = objectDefineProperty.f;


var NativeSymbol = global_1.Symbol;

if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  _export({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

var UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

var BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

var regexpStickyHelpers = {
	UNSUPPORTED_Y: UNSUPPORTED_Y,
	BROKEN_CARET: BROKEN_CARET
};

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y$1 && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

var regexpExec = patchedExec;

_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
  exec: regexpExec
});

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

var useSymbolAsUid = nativeSymbol
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';

var WellKnownSymbolsStore = shared('wks');
var Symbol$1 = global_1.Symbol;
var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

var wellKnownSymbol = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

// TODO: Remove from `core-js@4` since it's moved to entry points







var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
};

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod$1 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$1(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$1(true)
};

var charAt = stringMultibyte.charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
var advanceStringIndex = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classofRaw(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};

var max$1 = Math.max;
var min$2 = Math.min;
var floor$1 = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regexpExecAbstract(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max$1(min$2(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor$1(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

var nativePromiseConstructor = global_1.Promise;

var redefineAll = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};

var defineProperty$1 = objectDefineProperty.f;



var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var setToStringTag = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty$1(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};

var SPECIES$1 = wellKnownSymbol('species');

var setSpecies = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = objectDefineProperty.f;

  if (descriptors && Constructor && !Constructor[SPECIES$1]) {
    defineProperty(Constructor, SPECIES$1, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

var aFunction$1 = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

var anInstance = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};

var iterators = {};

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod = function (it) {
  return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

// optional / simple context binding
var functionBindContext = function (fn, that, length) {
  aFunction$1(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
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

var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG$1] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof = toStringTagSupport ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

var ITERATOR$1 = wellKnownSymbol('iterator');

var getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$1]
    || it['@@iterator']
    || iterators[classof(it)];
};

// call something on iterator step with safe closing on error
var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};

var iterate_1 = createCommonjsModule(function (module) {
var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = functionBindContext(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, next, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(anObject(step = iterable[index])[0], step[1])
          : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};
});

var ITERATOR$2 = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR$2] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR$2] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

var SPECIES$2 = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
var speciesConstructor = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES$2]) == undefined ? defaultConstructor : aFunction$1(S);
};

var html = getBuiltIn('document', 'documentElement');

var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent);

var location = global_1.location;
var set$1 = global_1.setImmediate;
var clear = global_1.clearImmediate;
var process = global_1.process;
var MessageChannel = global_1.MessageChannel;
var Dispatch = global_1.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global_1.postMessage(id + '', location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set$1 || !clear) {
  set$1 = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (classofRaw(process) == 'process') {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !engineIsIos) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = functionBindContext(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global_1.addEventListener && typeof postMessage == 'function' && !global_1.importScripts && !fails(post)) {
    defer = post;
    global_1.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
    defer = function (id) {
      html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

var task = {
  set: set$1,
  clear: clear
};

var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;

var macrotask = task.set;


var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
var process$1 = global_1.process;
var Promise = global_1.Promise;
var IS_NODE = classofRaw(process$1) == 'process';
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor$2(global_1, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process$1.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (IS_NODE) {
    notify = function () {
      process$1.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  } else if (MutationObserver && !engineIsIos) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    then = promise.then;
    notify = function () {
      then.call(promise, flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global_1, flush);
    };
  }
}

var microtask = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction$1(resolve);
  this.reject = aFunction$1(reject);
};

// 25.4.1.5 NewPromiseCapability(C)
var f$5 = function (C) {
  return new PromiseCapability(C);
};

var newPromiseCapability = {
	f: f$5
};

var promiseResolve = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var hostReportErrors = function (a, b) {
  var console = global_1.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};

var perform = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

var process$2 = global_1.process;
var versions = process$2 && process$2.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (engineUserAgent) {
  match = engineUserAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = engineUserAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var engineV8Version = version && +version;

var task$1 = task.set;










var SPECIES$3 = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = internalState.get;
var setInternalState = internalState.set;
var getInternalPromiseState = internalState.getterFor(PROMISE);
var PromiseConstructor = nativePromiseConstructor;
var TypeError$1 = global_1.TypeError;
var document$2 = global_1.document;
var process$3 = global_1.process;
var $fetch = getBuiltIn('fetch');
var newPromiseCapability$1 = newPromiseCapability.f;
var newGenericPromiseCapability = newPromiseCapability$1;
var IS_NODE$1 = classofRaw(process$3) == 'process';
var DISPATCH_EVENT = !!(document$2 && document$2.createEvent && global_1.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced_1(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
  if (!GLOBAL_CORE_JS_PROMISE) {
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (engineV8Version === 66) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    if (!IS_NODE$1 && typeof PromiseRejectionEvent != 'function') return true;
  }
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (engineV8Version >= 51 && /native code/.test(PromiseConstructor)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = PromiseConstructor.resolve(1);
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES$3] = FakePromise;
  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify$1 = function (promise, state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError$1('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(promise, state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document$2.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global_1.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (handler = global_1['on' + name]) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (promise, state) {
  task$1.call(global_1, function () {
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE$1) {
          process$3.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (promise, state) {
  task$1.call(global_1, function () {
    if (IS_NODE$1) {
      process$3.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, promise, state, unwrap) {
  return function (value) {
    fn(promise, state, value, unwrap);
  };
};

var internalReject = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify$1(promise, state, true);
};

var internalResolve = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, promise, wrapper, state),
            bind(internalReject, promise, wrapper, state)
          );
        } catch (error) {
          internalReject(promise, wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify$1(promise, state, false);
    }
  } catch (error) {
    internalReject(promise, { done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction$1(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
    } catch (error) {
      internalReject(this, state, error);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
    // `Promise.prototype.then` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE$1 ? process$3.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify$1(this, state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, promise, state);
    this.reject = bind(internalReject, promise, state);
  };
  newPromiseCapability.f = newPromiseCapability$1 = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if ( typeof nativePromiseConstructor == 'function') {
    nativeThen = nativePromiseConstructor.prototype.then;

    // wrap native Promise#then for native async functions
    redefine(nativePromiseConstructor.prototype, 'then', function then(onFulfilled, onRejected) {
      var that = this;
      return new PromiseConstructor(function (resolve, reject) {
        nativeThen.call(that, resolve, reject);
      }).then(onFulfilled, onRejected);
    // https://github.com/zloirock/core-js/issues/640
    }, { unsafe: true });

    // wrap fetch result
    if (typeof $fetch == 'function') _export({ global: true, enumerable: true, forced: true }, {
      // eslint-disable-next-line no-unused-vars
      fetch: function fetch(input /* , init */) {
        return promiseResolve(PromiseConstructor, $fetch.apply(global_1, arguments));
      }
    });
  }
}

_export({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
_export({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.github.io/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability$1(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

_export({ target: PROMISE, stat: true, forced:  FORCED }, {
  // `Promise.resolve` method
  // https://tc39.github.io/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve( this, x);
  }
});

_export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.github.io/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability$1(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction$1(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate_1(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.github.io/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability$1(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction$1(C.resolve);
      iterate_1(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var EMBETTY_LOGO = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 154.34 315.62\" width=\"40\" height=\"82\"><defs><style>.cls-1{fill:#735aa3;}.cls-2{fill:#b99bc9;}.cls-3{fill:#cc352b;}.cls-4{fill:#030304;}.cls-5{fill:#020204;}.cls-6{fill:#6ac4cb;}.cls-7{fill:#fff;}.cls-8{fill:#1a1a1a;}</style></defs><g id=\"Ebene_2\" data-name=\"Ebene 2\"><g id=\"Ebene_1-2\" data-name=\"Ebene 1\"><path class=\"cls-1\" d=\"M79.63,1.83c-5.3-3.6-11.4,4.2-9.4,9.2,0,.1.1.2.2.4-.3,1.7-.2,3.7,1.2,4.7v.1c.4,1.3.9,2.6,1.3,4a19.51,19.51,0,0,1-.2,7.6V28c-.3.4-.6.6-.7,1.1-.8,3,2.8,2.9,4.4,1.7a1.36,1.36,0,0,0-.2-2.2.1.1,0,0,1,.1-.1,5.82,5.82,0,0,0,.4-3.2c0-.6-.1-1.2-.1-1.7a1.46,1.46,0,0,0,.6-.9v-.3l.3-2.1.3-.3a5.29,5.29,0,0,0,1.5-3.2,1.38,1.38,0,0,0,1-1.3.9.9,0,0,0-.1-.5C82.83,11,83.83,4.73,79.63,1.83Z\"/><path class=\"cls-1\" d=\"M70.33,21.83a2.51,2.51,0,0,0-.4-.7,3.81,3.81,0,0,0-1.3-.9,1.33,1.33,0,0,0-.3-.8,26.87,26.87,0,0,0-4.5-3.7,8.28,8.28,0,0,0-4.4-1.9,1.25,1.25,0,0,0-1.3.8l-.3.3c-1.1.7-.9,2.3-.1,3.4a3.38,3.38,0,0,0,.6,1.2l.2.2a3.59,3.59,0,0,0,1,.7v.1a1.45,1.45,0,0,0,1.6.7c2.2.9,4.9.5,6.6,2.1a1.22,1.22,0,0,0,.9.4,1.1,1.1,0,0,0,1,.5A1.33,1.33,0,0,0,70.33,21.83Z\"/><path class=\"cls-1\" d=\"M83.63,19.43a2.6,2.6,0,0,0-3.2.6,3.53,3.53,0,0,0-.4,3.7c.1.1.1.2.2.3a2.46,2.46,0,0,0-.1,1.7c-.2,1.3,1.5,2.7,2.5,1.4.6-.8,1.2-1.5,1.9-2.3a1.06,1.06,0,0,0,0-1.4,3.55,3.55,0,0,0,.4-.9A3.06,3.06,0,0,0,83.63,19.43Z\"/><path class=\"cls-1\" d=\"M113.83,248.93c-1.5-.4-3.4.1-4.9,0a33.94,33.94,0,0,1-5.5-.4,37.35,37.35,0,0,1-7.3-1.9,5.3,5.3,0,0,0-3.4-1.7c-2.9-1.4-5.8-2.9-8.7-4.3-.1-.1-.2-.2-.3-.2a77.88,77.88,0,0,1-11-8.9c-2.3-2.3-4.3-4.7-6.5-7.1a7.64,7.64,0,0,0-.9-.9c-.4-.4-.7-.8-1.1-1.2a1.19,1.19,0,0,0-1.1-.4c-.2-.4-.5-.8-.7-1.2a30,30,0,0,0-3.3-5.4,16.31,16.31,0,0,1-.6-4.5,3.26,3.26,0,0,0-1.6-3,23.56,23.56,0,0,1,7.8-5.5,6.21,6.21,0,0,0,3.7,3,.37.37,0,0,1,.3.1l1.5,2.5a1.45,1.45,0,0,0,.1,1.1,5.94,5.94,0,0,0,.4.8.6.6,0,0,0,.1.4,7.76,7.76,0,0,0,1.2,2.2,23.49,23.49,0,0,0,2.3,3.2,50.2,50.2,0,0,0,6.6,10.3,24.16,24.16,0,0,0,2.7,3.6,3.81,3.81,0,0,0,.9,1.3,34.4,34.4,0,0,0,3.6,2.8,1.2,1.2,0,0,0,.4,1.2l1.2,1.2a1.08,1.08,0,0,0,.7.3,43.71,43.71,0,0,0,7.6,4.3,3.55,3.55,0,0,0,.9.4,39.86,39.86,0,0,0,12.4,2.7,1.25,1.25,0,0,0,1.1-.4h.7a3.45,3.45,0,0,0,1.8-.5,4.18,4.18,0,0,0,2.3-1.8c5.3-8.5,1.9-17.9-1.8-26.2a3.13,3.13,0,0,0-1.7-1.7,1.27,1.27,0,0,0,.1-.6l1.2-10.2a2.67,2.67,0,0,0-.3-1.8,26.36,26.36,0,0,0,.1-9.3c-1.1-7-3.8-15.4-8-21.3-3.9-5.5-10.6-9.5-16.6-12.2a28.18,28.18,0,0,0-13.4-2.3,4.23,4.23,0,0,0-2.7-.7c-2.3.4-4.5,1.1-6.7,1.7a3.54,3.54,0,0,0-2.4,2,24.08,24.08,0,0,0-3.3,1.5,32.9,32.9,0,0,0-17.8,14.6,35.39,35.39,0,0,0-9.3,27.3,8.74,8.74,0,0,0-.8,1c-2,3.3.7,7,4,7.1a17.89,17.89,0,0,0-.3,8.3,2.37,2.37,0,0,0,.9,1.5c-.4,4,1.7,8.8,4.8,11.7a3,3,0,0,0,.4,2.1,3.74,3.74,0,0,0,1.5,1.3,2.8,2.8,0,0,0,2,.2l.7-.3a2,2,0,0,0,.7-.6h.8c-.1.2-.1.4-.2.6a35.54,35.54,0,0,1-20.7,25.1,4.13,4.13,0,0,0-1.1.7q-4.35,1.2-8.7,2.1c-3.1.6-6.2.7-9.1,1.9l.1.1c-2,1.2-2.4,4.5.6,5.2,6,1.6,14.2-1,20.1-2.7q2.7-.75,5.4-1.8c3.2,1.5,6.6-.6,9.3-2.7a13.57,13.57,0,0,0,11.9-6.7.35.35,0,0,1,.1-.2c2.6-.6,5-2.1,5.9-4.8a5.76,5.76,0,0,0,.2-2.6c2.1,1.6,4,3.6,6.6,4.3a8.13,8.13,0,0,0,3,2.1,6.23,6.23,0,0,0-3.6,2c-2.1,2.4-2.6,5.9-2.6,9.3a3.45,3.45,0,0,0-2,3.2,5.84,5.84,0,0,0,.4,1.8c0,.2-.1.4-.1.6-1.2,13.1,6,26,18.3,31a2.34,2.34,0,0,0,1.1.2,5.32,5.32,0,0,0,5.1,2,16.35,16.35,0,0,0,10-.6,3.67,3.67,0,0,0,1.9-1.5c.7-.1,1.4-.3,2-.4,4.6-1.2,2.7-8.4-2-7.2a17.54,17.54,0,0,1-9.1-.1,4.3,4.3,0,0,0-.9-1c-3.6-3.5-7.1-5.7-8.4-10.9-1.4-5.4.4-9.9,2.9-14.6v-.1c.2-.2.4-.3.6-.5a3,3,0,0,0,1.1-3c1.8,1.3,3.6,2.5,5.4,3.8l.1.1a3.3,3.3,0,0,0-2.2,1.7,14.09,14.09,0,0,0-1.4,8.6c-.1.2-.1.5-.2.7a10.25,10.25,0,0,0,7,11c5,1.6,8.4-1.4,13-2.5a3.4,3.4,0,0,0,2.5-2.9c1.6-1,1.2-4.1-1.2-4.1-.3,0-.6.1-.8.1a3.34,3.34,0,0,0-1.5-.3,11.75,11.75,0,0,0-3.8.9,4.13,4.13,0,0,0-1.1-.7,6.47,6.47,0,0,0-1.3-.4s-.6-.2-.8-.3a1.42,1.42,0,0,0-.4-.2c-.2-.1-.4-.3-.6-.4a4,4,0,0,1-.4-.3l-.3-.3-.7-.7a8.34,8.34,0,0,0-1.2-.8,2.75,2.75,0,0,0-.8-1.5,16.66,16.66,0,0,1,.6-2.9,3.92,3.92,0,0,0,1.4.8,3.23,3.23,0,0,0,2.7-.4,14.7,14.7,0,0,0,1.3-1l.2-.2a15.09,15.09,0,0,0,7-2.7c3.7-2.5,7.7-7.8,6.5-12.5C117.93,254.43,117.93,250.13,113.83,248.93Zm-63.6-58.7a23.16,23.16,0,0,0-5.8,4.5l.9-2.7a35.82,35.82,0,0,1,2.4-4.8l.3-.3c1.3-1.4,2.6-2.8,3.9-4.3.1,0,.2-.1.3-.1a101,101,0,0,0,11.5-7.8c1.4-.5,2.7-1,4.1-1.4a1.42,1.42,0,0,0,.6.2,43.82,43.82,0,0,0,9.5-1c2.1.2,4.3.3,6.4.4,1.8.7,3.6,1.5,5.5,2.3a1.56,1.56,0,0,0,.6.8c.8.5,1.6,1.1,2.4,1.6a3.09,3.09,0,0,0,1.6,1.1,5.74,5.74,0,0,0,1.6,4.1,4.51,4.51,0,0,0,1.4,1,75,75,0,0,1,.3,8,16.27,16.27,0,0,0-1.1,2.3,13.36,13.36,0,0,1-2.1,2,24.69,24.69,0,0,0-1-2.9,1.4,1.4,0,0,0,.5-1.9c-.1-.3-.3-.5-.4-.8a.92.92,0,0,0-.2-1,23.07,23.07,0,0,1-1.4-1.9,1.22,1.22,0,0,0-1-.6c-.2-.3-.5-.6-.7-.9a1.2,1.2,0,0,0-1.4-.3c-5.5-6.5-15.7-6.7-23.7-4.8C59.13,182.13,53.53,185.33,50.23,190.23Z\"/><path class=\"cls-1\" d=\"M58.53,264.93a1.4,1.4,0,0,0-1.2-1.4,1.27,1.27,0,0,0-1.8.1,8.52,8.52,0,0,0-1.7,2.5c-.3.3-.7.6-1,.9a5.7,5.7,0,0,0-1.3.1c-1.1.3-2.2.7-3.3,1a3.66,3.66,0,0,0-1.6,1c-1.3.4-2.7.7-4,1.1a.76.76,0,0,0-.4.2c-1.8-.2-3.6.3-4.4,2.2a1.88,1.88,0,0,0-.2.8,15.47,15.47,0,0,0-3.8,9.5,2.77,2.77,0,0,0,.1.9,24.45,24.45,0,0,0-1.2,5.5c-.4,2.4-.5,5.1-.8,7.7-2.4,3.5-3.4,7.8-4.8,11.8-1.1,3.5,3.8,6.4,6.2,3.6a24.57,24.57,0,0,0,5.4-12.1l.2-.2a3.34,3.34,0,0,0,.8-3.7,3.11,3.11,0,0,0,1.7-2.1c2.4-6.9,5-12.6,10.8-17.4a3.83,3.83,0,0,0,2.9-2.6l.9-2.5a3,3,0,0,0-.1-2.3l.3-1.8a6.11,6.11,0,0,1,.7-1.4A1.48,1.48,0,0,0,58.53,264.93Z\"/><path class=\"cls-2\" d=\"M97.13,188a2,2,0,0,0,.2-.9l-.2-3a1.49,1.49,0,0,0-1.7-1.4v-.2c-.3-1.1-.5-2.2-.8-3.3a1.33,1.33,0,0,0-1.8-1,14,14,0,0,0-2.7-2.1,1,1,0,0,0-.9-.1h0a1.37,1.37,0,0,0-1.3-.4,1.38,1.38,0,0,0-.4-.3c-.8-1.5-3.1-2-5-1.9-.1,0-.2-.1-.4-.1a1.38,1.38,0,0,0-1.5.5,1.48,1.48,0,0,0-1.8-1.3c-.9.2-1.8.3-2.8.5l-6.1,1.2a22.1,22.1,0,0,0-4.9.9,1.24,1.24,0,0,0-.8.6,1.41,1.41,0,0,0-.9-.1l-1.8.6a.6.6,0,0,0-.4.1c-.3.1-.7.3-1,.4a1.38,1.38,0,0,0-1,1.4.76.76,0,0,0-.4.2c-2.6,2-5.1,4.1-7.7,6.2-1.2,1,.4,3.1,1.7,2.2a60,60,0,0,1,13.5-7.6,1.25,1.25,0,0,0,1.2.3c1-.2,1.9-.4,2.9-.7,1.2-.2,2.4-.4,3.7-.5h6a1.38,1.38,0,0,0,.4.3,11.08,11.08,0,0,0,3.5,1.2h0l5.3,3.8a1.32,1.32,0,0,0,1.2.2c.3,1.8,1.2,3.5,3.3,3.5.2,0,.3,0,.4-.1-.1.8-.1,1.6-.2,2.4a1.27,1.27,0,0,0,.1.6,1.63,1.63,0,0,0,2.6,1.3,3,3,0,0,0,1.2-1.9A3.49,3.49,0,0,0,97.13,188Z\"/><path class=\"cls-2\" d=\"M111.43,243.93c-5.4,3-11.4.2-16.4-2.3a69.32,69.32,0,0,1-7.5-4.3.91.91,0,0,0-.4-.8l-1.5-1.5a1.28,1.28,0,0,0-.4-1c-1.1-1-2.2-2-3.2-3-.5-.6-.9-1.2-1.4-1.8,0-.1-.1-.2-.1-.3-.3-.5-.7-1.1-1-1.6a1.26,1.26,0,0,0-1-.7l-.4-.4a1.58,1.58,0,0,0-1.2-.5,9.29,9.29,0,0,1-.5-1,1.42,1.42,0,0,0-.2-.6c-1.1-2.1-2.3-4.1-3.4-6.2-.3-.5-.6-.7-1-.7-.5-1-1-1.9-1.5-2.9a1.64,1.64,0,0,0,.1-1,12.17,12.17,0,0,0-2.6-5.2,3,3,0,0,0-1.5-1.8,2.45,2.45,0,0,0-3.8-.6,4.62,4.62,0,0,0-.7.7c-1.2.1-2.8.8-3.1,2.3-1.7.9-2,3.4.1,4.8a3,3,0,0,0,.8.4,10.46,10.46,0,0,0,1.3,2.3,1.42,1.42,0,0,0,.2.6l3,4.2a1.87,1.87,0,0,0,.7.6,1.62,1.62,0,0,0,.4,1l3.7,4.6a1.44,1.44,0,0,0,1.5.4l.1.1a.86.86,0,0,0,.3.6c.8,1.1,1.7,2.2,2.5,3.3a1.41,1.41,0,0,0,1.4.6c.4.5.8,1.1,1.2,1.6a1.25,1.25,0,0,0,1.3.4,51.09,51.09,0,0,0,7.5,5.4,1.45,1.45,0,0,0,1.1.1,73.2,73.2,0,0,0,11.3,6.2c5.2,2.2,10.6,3.5,15.8.6C114.63,245.63,113.13,243,111.43,243.93Z\"/><path class=\"cls-2\" d=\"M95.63,291.53a13.85,13.85,0,0,1-7.2-7.3,1.28,1.28,0,0,0,.4-1c-.2-1.5-.4-3.1-.6-4.6a12.4,12.4,0,0,0,1.1-3.7,2.92,2.92,0,0,0-.6-2.1c.1-.2.1-.3.2-.5a1.47,1.47,0,0,0,.5-.6c.1-.4.3-.7.4-1.1.6-1.6-1.8-2.4-2.6-1.1a14.59,14.59,0,0,0-1.6,3,8.18,8.18,0,0,0-2.7,4c-2.6,8.5,4.3,15.2,11.6,17.9C96,294.83,97.13,292.23,95.63,291.53Z\"/><path class=\"cls-2\" d=\"M90.93,305.43a21.79,21.79,0,0,1-14.7-4.5,1.22,1.22,0,0,0-1.4-.1l-2.1-1.8c-2.9-5.2-5.9-10.3-8.8-15.5a2.2,2.2,0,0,0-.1-.8,25.33,25.33,0,0,1-1.2-3.6,2,2,0,0,0,.5-1.4c-.2-1.6-.5-3.2-.7-4.9.3-2.3.7-4.6,1-6.9v-.6c.8-1.7,1.7-3.3,2.5-5a1.15,1.15,0,0,0,.1-1,3,3,0,0,0,.8-1.7l.1-.1a1.27,1.27,0,0,0,.9-.7l.3-.3a1.46,1.46,0,0,0,.5-2,8.79,8.79,0,0,1-.6-1,1.62,1.62,0,0,0-1.4-.7h0a1.06,1.06,0,0,0-1.2-.1.78.78,0,0,0-.4-.4,2.12,2.12,0,0,0-2.2-1.5c-2.2,0-2.8,1.9-2.5,3.7a15.63,15.63,0,0,0-4.2,3.2c-.4.4-.9.8-1.3,1.2a90,90,0,0,1-25.6,9.1c-1.7.3-1.2,2.9.4,2.9a40.33,40.33,0,0,0,14.6-2.4,1.38,1.38,0,0,0,1.1.1,65.89,65.89,0,0,0,14.4-7.6c-.6,1.1-1.1,2.2-1.7,3.3a1.31,1.31,0,0,0,.3,1.8,26.47,26.47,0,0,0-2,4.7,46.57,46.57,0,0,0-.9,7.5c-.1.1-.3.2-.4.3l-.3.3a1.4,1.4,0,0,0-1.9.1,51.2,51.2,0,0,0-8.1,11q-1.65,1.35-3.3,3a1.49,1.49,0,0,0,2.1,2.1c.7-.7,1.5-1.3,2.2-2a1.42,1.42,0,0,0,.6-.2c.5-.3,1.1-.6,1.6-.9a1.34,1.34,0,0,0,.6-.7,23,23,0,0,0,7.8-5.1.1.1,0,0,0,.1.1c.9,1.3,1.8,2.7,2.7,4a1.48,1.48,0,0,0,0,1.3,31.13,31.13,0,0,0,31.8,16.5A1.35,1.35,0,1,0,90.93,305.43Z\"/><path class=\"cls-3\" d=\"M84.83,144.13a5.5,5.5,0,0,0-.7-.9,2.15,2.15,0,0,0-3.1-2.6c-.1.1-.2.1-.3.2a.9.9,0,0,0-.5-.1,3.3,3.3,0,0,0-2.2.2c-1.6.3-3.3,1-3.3,2.9-.1,2.2,2,3.3,3.9,3.4h.1a3.53,3.53,0,0,0,1.4-.3,7.62,7.62,0,0,0,3.3.2A2,2,0,0,0,84.83,144.13Z\"/><path class=\"cls-1\" d=\"M147.33,134.23c-8.5,23.8-21,35.4-35.5,42.7,0,0-10-22.4-34.2-23-25.9-.6-38.2,23-38.2,23-13.1-7.7-25.5-21.5-33-42.7-14.1-39.7,3.1-101.8,70.1-101.8C146.43,32.43,162.53,91.53,147.33,134.23Z\"/><path class=\"cls-4\" d=\"M40,179.33l-1.6-.9c-10.6-6.2-25-18.9-33.8-43.6a86.51,86.51,0,0,1-4.1-37.7A78.79,78.79,0,0,1,14.13,60c9.4-13.4,27.9-29.3,62.3-29.3,36.6,0,55.5,15.9,64.8,29.2,14.1,20,17.1,48.7,7.7,75-7.6,21.4-18.8,34.9-36.4,43.7l-1.6.8-.7-1.7c-.1-.2-9.9-21.4-32.7-22-24.5-.6-36.5,21.8-36.7,22.1Zm36.6-27.1h1c21.1.5,32,17.1,34.9,22.4,15.8-8.4,26.1-21.1,33.1-41l1.6.6-1.6-.6c9-25.2,6.2-52.7-7.3-71.8-12.8-18.1-34.2-27.7-62-27.7-32.9,0-50.5,15.1-59.4,27.9a76.77,76.77,0,0,0-13,35.5,84.22,84.22,0,0,0,4,36.2c8,22.6,20.9,34.7,30.8,40.9a53,53,0,0,1,8.9-10.6A41.88,41.88,0,0,1,76.63,152.23Z\"/><path class=\"cls-4\" d=\"M120.23,220.93a25.81,25.81,0,0,0-1.8-4.6,14.85,14.85,0,0,0-2.7-4.3c2.4-7.7,2.9-18.8,1.1-26.5-2.6-11.6-8-19.3-20.3-27.1-9.9-6.2-22.7-6.4-33.4-2.4-10,3.7-20.1,10.7-25.7,19.8-3,5-4.3,10.7-5.3,16.5s-.9,13.1,3,18.1a32.53,32.53,0,0,0-.3,4.4c0,8.1,3.5,17.2,10.7,21.5a.37.37,0,0,0,.3.1l-.9,3.6a22.82,22.82,0,0,1-6.7,10.3c-6.9,6.4-16.3,8.8-25.2,10.7-3.2.7-7.8,2.4-6.5,6.6s6.3,4.3,9.9,4.1l3.5-.3a81.51,81.51,0,0,0,11,.4c1.8,0,3.6-.2,5.5-.3-4.6,3.6-5.5,10.8-5.8,16.2-.2,3.8-.2,7.6-1.3,11.3-1,3.5-4.1,6.2-4.7,9.8a5.73,5.73,0,0,0,4.5,6.6c3.3.8,6.3-1,8.2-3.6a14.42,14.42,0,0,0,2.3-5.8l.2-.2c0-.1.1-.2.1-.3.3-1,.7-2.1,1-3.1.4-1.3,1-2.6,1.5-3.8a6.11,6.11,0,0,1,1.3-2.2v-.1a9.79,9.79,0,0,1,3.1-2.6c3.2-1.8,7.1-2.6,9.7-5.1l.9,2.4a31.33,31.33,0,0,0,22,18,32.16,32.16,0,0,0,8.2.8,25.36,25.36,0,0,0,2.9-.4,14.7,14.7,0,0,0,6-2.3V307a17.64,17.64,0,0,0,7.3-3.5c1.6-1.3,3.3-3,3.8-5.1a4.4,4.4,0,0,0-2.6-5.1,5,5,0,0,0-1.3-.4l1.5-.6c3.4-1.4,7.7-3.9,9.6-7.2a4,4,0,0,0-.6-5,5,5,0,0,0-5-.5c-2,.6-3.9,1.1-6,.4a7.61,7.61,0,0,1-2.8-1.5,5.82,5.82,0,0,1-1-1.1.71.71,0,0,1-.3-.6v-.1h0a1.94,1.94,0,0,1,1.7-1l2.5-.3a.1.1,0,0,1,.1-.1,20.57,20.57,0,0,0,14.2-12.1c1.6-3.8,2.4-10.4.1-14.5v-.2a1,1,0,0,1-.4-.5h0l-.1-.1c-.1-.1-.2-.1-.3-.3v-.1h-.1a1.79,1.79,0,0,1-.7-.5,2.94,2.94,0,0,1-1-.3h0a5.7,5.7,0,0,0-1.3.1,1.27,1.27,0,0,0-.6.1,2.19,2.19,0,0,0,.5-.3,35.53,35.53,0,0,0,3.1-2.3,17.39,17.39,0,0,1,1.1-1.8,9,9,0,0,0,1.2-2.4v-.3a1.33,1.33,0,0,1,.3-.5.35.35,0,0,1,.1-.2h-.1a23.45,23.45,0,0,0,1.7-8A27.05,27.05,0,0,0,120.23,220.93Zm-84.6-27.3a44.86,44.86,0,0,1,4.7-13.6,45.56,45.56,0,0,1,20.2-19.6c9.4-4.6,21.2-5.7,30.9-1.3,10,4.5,17.2,14.2,20.4,24.4,1.8,5.9,2.2,12.2,2.2,18.4,0,5.3-1,10.7-4,15.1a33.38,33.38,0,0,1-4.3-1,14.07,14.07,0,0,1-4.9-3.1,15.2,15.2,0,0,1-4.4-8.6.75.75,0,0,0-.1-.5,1.7,1.7,0,0,0-.1-.7l.3-.6a18,18,0,0,0,.3-8.3,13.24,13.24,0,0,0-.1-12.8c-2.3-4.2-6.5-7-11-8.4-7.6-2.4-16.2-1.4-23.5,2a1.39,1.39,0,0,0-1,.5,32.34,32.34,0,0,0-4.4,2.7c-4.9,3.5-8.7,8.3-12.2,13.1a.66.66,0,0,0-.1.6,35.81,35.81,0,0,0-8.4,14.6C34.63,202.33,34.93,197.83,35.63,193.63Zm48.6-17.9a2.56,2.56,0,0,0-3,.2,2,2,0,0,0-.6,2.3,30.9,30.9,0,0,0-15.1.4,1.9,1.9,0,0,0,.8-2.2,2.62,2.62,0,0,0-.5-.9,32.8,32.8,0,0,1,8.8-1.8c5.8-.4,12.2.6,16.9,4.4a6.47,6.47,0,0,1,.9.8c-.2.1-.4.1-.5.2a2.39,2.39,0,0,0-1,2.9,2.5,2.5,0,0,0,2.6,1.7,2.94,2.94,0,0,0,1.8-1,11.48,11.48,0,0,1,.9,8.7,20.75,20.75,0,0,0-7.5-9.6,33.54,33.54,0,0,0-3.6-2.1A2.93,2.93,0,0,0,84.23,175.73Zm-1.9,2.1c-.4-.7.8-.7,1.2-.4.5.5.1,1.2-.5,1.4h-.1a1.45,1.45,0,0,0-.7-.2A.75.75,0,0,0,82.33,177.83Zm11.6,2.8c0,.1.1.1.1.2a.37.37,0,0,0-.1.3c-.1.4-.2.7-.7.8-.3.1-.6-.2-.7-.5C92.23,180.43,93.33,180.53,93.93,180.63Zm-31.1-3.4-.3-.3c.1-.1.3-.1.4-.2a.87.87,0,0,0,1,.1c.2-.1.7-.2.7.2s-.4.4-.6.4A4.3,4.3,0,0,1,62.83,177.23Zm.8,2a45,45,0,0,0-12.4,6.6,39.35,39.35,0,0,1,7.4-6.7c.7-.5,1.5-.9,2.3-1.4A3,3,0,0,0,63.63,179.23ZM38,217.33c-.7-7,1.6-13.8,5.6-19.6,8.2-11.7,25-21.4,39.3-15.7,7.6,3.1,13,11.3,10.7,19.5a26.13,26.13,0,0,0-14.3-3.1,45.22,45.22,0,0,0-12.1,2.2c-5.3,1.9-10,4.7-12.2,7.1a26.86,26.86,0,0,0-7,18.5,27.23,27.23,0,0,0,.4,4.2,10.36,10.36,0,0,0-1.7,3.3A23.66,23.66,0,0,1,38,217.33Zm34.7,4.1a2.52,2.52,0,0,0-1.4,3c.6,2.3,4.1,3.1,5.7,1.3a59.2,59.2,0,0,0,6.8,8.2,25.23,25.23,0,0,0,3,2.7,2,2,0,0,0-1.1,1.1,2.39,2.39,0,0,0,.4,2h0a52.07,52.07,0,0,1-5.5-3.6,2.79,2.79,0,0,0,1.3-2.2,2.59,2.59,0,0,0-2.1-2.7,2.76,2.76,0,0,0-3,1.2,1.42,1.42,0,0,0-.2.6,70.79,70.79,0,0,1-10.5-10.7,3.1,3.1,0,0,0,2.4-1,3,3,0,0,0,.2-3.8,2.8,2.8,0,0,0-3.7-.6,2.73,2.73,0,0,0-1.2,2.4c-2.5-3.4-4.9-7.4-4.6-11.4.1,0,.1-.1.2-.1,1.1-.8,3.5-2.7,5.4-3-2.7,1.5-2.7,3.5-2.3,4.7a3.11,3.11,0,0,0,2.6,2.3,4.66,4.66,0,0,0,3.4-1.1,104.22,104.22,0,0,0,5.4,9.9,2.09,2.09,0,0,0,.4.6A6.27,6.27,0,0,0,72.73,221.43Zm1.6,2.1a.75.75,0,0,0,1-.2c.2.3.4.7.6,1l-.1.1a1.67,1.67,0,0,1-2.5,0c-.2-.3-.4-.8-.1-1.1S74,223.33,74.33,223.53Zm4.8,11.3c-.2,0-.3.1-.4.1a1.38,1.38,0,0,0-.4-.3c-.2-.7,0-1.6.9-1.5A.85.85,0,0,1,79.13,234.83Zm-13.3-14.3c-.2-.6-.5-1.4.1-1.8a1,1,0,0,1,1.3.2C67.83,220,66.73,220.73,65.83,220.53Zm.5-14.3s1,2.4,1.3,2.9c-1,.7-2.6,1.8-3.4.2A2.16,2.16,0,0,1,66.33,206.23Zm-46.5,62.2c-1.9.2-3.8.3-5.6.4-1.3,0-5.7-.3-4.6-2.7.5-1.2,2.6-1.5,3.7-1.7,2.2-.5,4.5-.9,6.7-1.5,7.5-1.9,14.9-4.9,20.6-10.3a25.79,25.79,0,0,0,6.6-9.7c1-2.6,1.2-5.6,2.2-8.2,2.1,5.7,6.1,10.4,10.9,14.5a15.08,15.08,0,0,1-5.7,6.8,58.78,58.78,0,0,1-10.4,5.8A81.71,81.71,0,0,1,19.83,268.43Zm32.1-6.9c0,.1-.1.1-.1.2a1.56,1.56,0,0,1-.6,1.2c-.3.2-.8.3-1,0a.45.45,0,0,1,0-.5,10.91,10.91,0,0,0,1.1-.6c.1,0,.1-.1.2-.1a.1.1,0,0,0,.1-.1C51.83,261.63,51.83,261.63,51.93,261.53Zm-10.6,4.9a1.15,1.15,0,0,1-.8,1,1.38,1.38,0,0,1-1.1.1.68.68,0,0,1-.5-.3A22.5,22.5,0,0,0,41.33,266.43Zm-11,3.7h-1.4a64.55,64.55,0,0,0,8.6-2.4.76.76,0,0,0,.2.4,2.73,2.73,0,0,0,2.7.8,2.92,2.92,0,0,0,2.2-1.8,2.44,2.44,0,0,0,0-1.2,5.36,5.36,0,0,0,1.1-.5c1.6-.7,3.3-1.4,5.1-2.3a2.62,2.62,0,0,0,.5.9,2.29,2.29,0,0,0,2.5.3,2.85,2.85,0,0,0,1.4-2.5.66.66,0,0,0-.6-.7c4.3-2.5,8.3-5.7,10.1-9.9,1,.8,2,1.6,3,2.3-.6.9-1.3,1.8-2,2.7a1.83,1.83,0,0,0-2.4-.5c-1,.4-2.1,1.3-1.8,2.5a1.38,1.38,0,0,0,1.3,1.1,38.75,38.75,0,0,1-15.5,8.6A52.82,52.82,0,0,1,30.33,270.13Zm30.5-6.4h0a2.15,2.15,0,0,0-.8,0c-.1,0-.2.1-.3.1.1-.2.2-.5.3-.7a1.91,1.91,0,0,1,.5-1h0a34.5,34.5,0,0,0,6.8-7.5l1.2.9a27.43,27.43,0,0,0-5.3,9.8l-.3-.3c0-.1-.1-.2-.1-.3A1.87,1.87,0,0,0,60.83,263.73Zm2.1,2.9a4.33,4.33,0,0,1-.1.5h-.1v.1a1.88,1.88,0,0,1-.4.9h-.4a1.08,1.08,0,0,1-.9-.2c-.2-.1-.4-.1-.6-.3s-.4-.3-.4-.6a.94.94,0,0,1,1.4-1h0a3.7,3.7,0,0,1,1.1.5C62.63,266.63,62.83,266.73,62.93,266.63Zm-1.6-9.2a1.62,1.62,0,0,1,.9-.5c.2-.1.5-.2.5.1s-.8.5-1.1.5a.7.7,0,0,0-.5.4C61,257.73,61.23,257.53,61.33,257.43Zm-11.7,32.7-.3.3h-.1a.84.84,0,0,1-.7.4h0a4.87,4.87,0,0,1-.7.3l-.1-.1a1.2,1.2,0,0,1-.8-.2.37.37,0,0,1-.2-.5v-.1c-.1-.2-.1-.4.1-.5v-.1a1.5,1.5,0,0,1,1.8-.8q.6-.15.9.6C49.93,289.73,49.83,290,49.63,290.13Zm2-.4v-.4a2.6,2.6,0,0,0-3-1.8,3.37,3.37,0,0,0-2.7,2.3,2.47,2.47,0,0,0,.5,2.2,7.46,7.46,0,0,0-1.2.7,11.31,11.31,0,0,0-2.6,2.3c.6-1.4,1.2-2.7,1.9-4a41.23,41.23,0,0,1,5.2-7.2,3,3,0,0,0,2.8,1.2,2.65,2.65,0,0,0,2.2-2.3,2.14,2.14,0,0,0-1.6-2.2c.6-.5,1.2-1,1.7-1.5a39.71,39.71,0,0,0,1.1,7.7A13.29,13.29,0,0,1,51.63,289.73Zm-.5-7.3a.55.55,0,0,1,.3-.5.37.37,0,0,1,.3-.1l.1-.1h0a1,1,0,0,1,.9.2,1.38,1.38,0,0,1,.3.4v.1a.91.91,0,0,1,0,1,1.09,1.09,0,0,1-.9.4c-.1,0-.2-.1-.3-.1s-.3-.1-.4-.1A1,1,0,0,1,51.13,282.43Zm4.3-10.7h0v.2c0,.1,0,.1-.1.2a.37.37,0,0,1-.1.3c-.1.6-.3,1.1-.4,1.7a21.4,21.4,0,0,1-4.2,4.3,42.58,42.58,0,0,0-6.4,7,43,43,0,0,0-7.4,17.8c-.5,2.9-1.2,6.5-3.8,8.4-2.2,1.6-6.2.7-5.3-2.6.4-1.5,1.5-2.8,2.3-4.2a19.68,19.68,0,0,0,2.1-4.4,36.83,36.83,0,0,0,1.4-9.4c.2-3.5.2-7,1.2-10.4a15.84,15.84,0,0,1,1.9-4.4,7.54,7.54,0,0,1,.6-1.3,10,10,0,0,1,.8-1.4l.1-.1a4,4,0,0,1,1.3-1.6.76.76,0,0,1,.2-.4,1.13,1.13,0,0,1,.8-.5h.2q3.15-.6,6.3-1.5a43.81,43.81,0,0,0,11.3-5.5A25.2,25.2,0,0,0,55.43,271.73Zm12.1,29.2c0-.8.5-1.1,1.2-1.2a.64.64,0,0,1,.6,0c.7.1,1.5.7,1.4,1.5C70.73,303,67.53,302.53,67.53,300.93Zm3.1,2.5a1.76,1.76,0,0,0,.9-.8,2.9,2.9,0,1,0-5.2-2.5,28.91,28.91,0,0,1-8.1-12.8,2.11,2.11,0,0,1-.4-1v-.1c-.1-.1-.1-.2-.1-.4s-.1-.3-.1-.5-.1-.1-.1-.2,0-.1-.1-.2v-.3h0A20.24,20.24,0,0,1,57,282a2.87,2.87,0,0,0,2.7-.2,3,3,0,0,0,1.3-3.6,2.85,2.85,0,0,0-3.2-1.8,4.88,4.88,0,0,0-.7.3v-3.3c.1-.3.1-.6.2-.9h0v-.1a4.25,4.25,0,0,1,.2-1.1,1.69,1.69,0,0,1,.3-1h-.1c.2-.8.5-1.6.7-2.5a3.86,3.86,0,0,0,1.6,1.5,3.1,3.1,0,0,0,1.3.6,2.48,2.48,0,0,0,.9-.1,29.59,29.59,0,0,0,.5,10.7,30.3,30.3,0,0,0,2.2,6.4h-.1c.1.2.3.5.4.7l.6,1.2h0c.1.1.1.3.2.4-.1,0-.1,0-.2.1a1.39,1.39,0,0,1-1.3,1.6c-.8.1-1.8-.6-1.6-1.5v-.1a1.17,1.17,0,0,0-.9-1.1.76.76,0,0,0-.5.2,2.77,2.77,0,0,0,0,1.8c.9,2.5,4,2.4,5.5.5a35.7,35.7,0,0,0,12.2,12.8,23.41,23.41,0,0,0,12.2,3.6A28.12,28.12,0,0,1,70.63,303.43Zm-13.8-24.1a1.28,1.28,0,0,1,1.1-1.2h.4a1.85,1.85,0,0,1,1.2.5,1.2,1.2,0,0,1-.2,1.8,1.4,1.4,0,0,1-1.8.3C57.13,280.63,56.83,279.93,56.83,279.33Zm47.3,17.3c1,1.1-.3,2.5-1.1,3.3a13.94,13.94,0,0,1-4.8,3.2,18.3,18.3,0,0,1-12,.5c-8.5-2.5-14.9-10.2-18.4-18a28.06,28.06,0,0,1,3.1-28.6c.7.5,1.5,1,2.2,1.5l12.7,8.9a17,17,0,0,0-4.4,19,16.18,16.18,0,0,0,8,8.1,16.85,16.85,0,0,0,5.4,1.6c2.2.3,4.3-.2,6.5-.4A4.68,4.68,0,0,1,104.13,296.63Zm-17.6-22.7c.4.2.4.7.2,1.1a1.37,1.37,0,0,1-1.3.6,1,1,0,0,0,0,1.9,4.39,4.39,0,0,0,2.2-.7,30.85,30.85,0,0,0,0,4.3,1.88,1.88,0,0,0-.8-.2,2,2,0,0,0-2,1.5,2.52,2.52,0,0,0,1,2.5,2.75,2.75,0,0,0,2.5.2c.6,2.5,4.2,5.8,7,7.3-6.6,1.4-11.5-6.2-11.8-10.9a14.69,14.69,0,0,1,1.3-7.2A1.42,1.42,0,0,1,86.53,273.93ZM86,272a11.85,11.85,0,0,1,2.5-2.5c.3.2.5.4.8.6-.4,1-.8,2-1.1,3A2.42,2.42,0,0,0,86,272Zm1.3,11.8c-.1.1-.2.2-.3.2a.6.6,0,0,1-.4.1h-.1a1.33,1.33,0,0,1-.8-.3.44.44,0,0,1-.1-.5v-.1c0-.1,0-.2.1-.2s.1-.1.1-.2v-.1c0-.1.1-.1.1-.2a.62.62,0,0,1,.8-.1l.3.3a.76.76,0,0,1,.2.5v.1h0C87.43,283.43,87.53,283.63,87.33,283.83Zm22.5-1c.7-.2,2.5-.9,2.5.3,0,.9-1.4,1.9-1.9,2.4a26.32,26.32,0,0,1-5.2,3.5c-3.9,1.9-8.1,2.1-10.8.6-6.2-3.5-5.9-11.8-3.5-18.4l5.7,4.1a3.25,3.25,0,0,0-.4,1.4,5.66,5.66,0,0,0,2.5,4.5A11.89,11.89,0,0,0,109.83,282.83Zm3.8-34c2,1.1,2.5,4,2.6,6.1a17,17,0,0,1-2,8.6,17.85,17.85,0,0,1-13.9,9.3,1.27,1.27,0,0,0-.9.4c-6.2-4.4-12.4-8.7-18.6-13.1-5.7-4-11.6-7.8-17-12.2h0c-.4-.3-.7-.6-1.1-.9a8,8,0,0,1-1.7-1.5c-3.8-3.4-7.2-7.5-8.8-12.4a18.25,18.25,0,0,1-.7-2.5,1.16,1.16,0,0,0-.2-1,23.68,23.68,0,0,1,1.8-13.9,22.19,22.19,0,0,1,4-6.1c.2,3.9,2.9,7.8,5,10.8A71.4,71.4,0,0,0,96,246.53c5.2,1.9,11,3.7,16.5,2.2h.2A1.53,1.53,0,0,0,113.63,248.83Zm-24.9-9.7a1.8,1.8,0,0,1-1-.2c-.1-.1-.7-.7-.1-.7a.6.6,0,0,0,.6-.3l1.3,1A1.88,1.88,0,0,1,88.73,239.13Zm2.5.9a39.77,39.77,0,0,0,5,2.7,1.57,1.57,0,0,0-1,1.1c0,.1-.1.3-.1.4-2.4-1-4.8-2.1-7.1-3.3A3.72,3.72,0,0,0,91.23,240Zm6.1,4.3c.1,0,.3-.1.4-.1a1.7,1.7,0,0,1,1,0c.4.1,1.1.7.5,1.1q-.3.15-.3.3a1.85,1.85,0,0,0-.7-.2,6.9,6.9,0,0,1-.8-.3A2,2,0,0,0,97.33,244.33Zm4,.2a31.1,31.1,0,0,0,9.1,1.1c.1,0,.2-.1.3-.1l1.8-.3a15.06,15.06,0,0,1-3.5,1.4c-1.2.3-2.4.3-3.6.6a36.32,36.32,0,0,1-4.5-1A2.54,2.54,0,0,0,101.33,244.53Zm15.5-7.1c-.6,1.7-1.7,3.9-3.4,4.9h-.2c-10.7,1.6-20.9-4-28.1-11.5a69.38,69.38,0,0,1-9.2-12.5c-2.6-4.5-5.6-9.9-7.9-14.6,3.9-1.9,9.1-2.2,13.4-2a27.83,27.83,0,0,1,12,3.5,18,18,0,0,0,5.2,10.1,20.11,20.11,0,0,0,5.5,3.6,14.08,14.08,0,0,0,3.1,1h0c1.7,0,3.5.1,5-.7a27.06,27.06,0,0,0,2.1-3.7,10,10,0,0,1,.8,1.4,25.44,25.44,0,0,1,1.6,3.8,28.15,28.15,0,0,1,1.4,8.6A18.91,18.91,0,0,1,116.83,237.43Z\"/><path class=\"cls-5\" d=\"M83.23,18.13c-2.2-.6-3.8,1-4.2,3.1-.6,3,2.5,7.5-1.1,9.3l-.1.1c-2.9-7,4.5-13.6,5.8-20.2.9-4.6-1.6-10.9-7.2-10.4-5.9.5-7.7,7.2-6.9,12.1.6,3.7,2.6,8.5,2.8,12.7a14.05,14.05,0,0,0-4.7-7.3c-2.4-2.2-7-6.5-10.4-3.7-3.1,2.5-.6,6.7,2.2,8.1,2.2,1,4.6,1.1,6.9,1.6,1.8.4,4.3,1.7,4.9,3.5a8.75,8.75,0,0,1-.2,1.6V29c-.1.2-.2.3-.3.5a.64.64,0,0,0,.3,1,8.9,8.9,0,0,1-1.9,2c-.6.5-.1,1.5.6,1.1,4.5-2.8,4.6-8.5,3.5-13.1C71.93,15,67.73,5.23,75,2c3.3-1.4,6.3,1.1,7.1,4.2.9,3.5-.7,7-2.3,10-2.6,4.9-5.8,10.2-3.1,15.8.3.7,1.2.3,1.3-.3.1,0,.2.1.3,0,.4-.1.7-.2,1-.3a2.51,2.51,0,0,0,2.3,2.5c.8.1,1-1.3.2-1.4-3.1-.5,1.1-4.2,1.8-5a9.73,9.73,0,0,0,2.1-3.3C86.53,21.53,85.73,18.83,83.23,18.13Zm-23.5,2.2c-2.1-1.1-4.2-5-.8-5.9,2.4-.6,4.6,1.6,6.3,2.9a16.08,16.08,0,0,1,5.1,6.2h0C67.33,21.23,63.13,22,59.73,20.33ZM81,27.53v-.8c-.2-1.7-1-3.4-.7-5.1.5-2.7,3.7-2.6,4.1.1S82.73,25.83,81,27.53Z\"/><ellipse class=\"cls-6\" cx=\"58.43\" cy=\"53.93\" rx=\"6.4\" ry=\"2.2\"/><ellipse class=\"cls-6\" cx=\"95.53\" cy=\"38.73\" rx=\"2.6\" ry=\"7.6\" transform=\"translate(42.91 127.38) rotate(-81.38)\"/><ellipse class=\"cls-6\" cx=\"38.63\" cy=\"46.71\" rx=\"6.4\" ry=\"2.2\" transform=\"translate(-11.76 13.01) rotate(-16.64)\"/><ellipse class=\"cls-6\" cx=\"61.62\" cy=\"37.93\" rx=\"8.2\" ry=\"2.8\" transform=\"translate(-3.28 5.93) rotate(-5.37)\"/><ellipse class=\"cls-6\" cx=\"121.32\" cy=\"48.86\" rx=\"2.2\" ry=\"6.4\" transform=\"translate(25.52 137.9) rotate(-64.84)\"/><ellipse class=\"cls-6\" cx=\"90.93\" cy=\"51.73\" rx=\"4.8\" ry=\"1.6\"/><path class=\"cls-3\" d=\"M85,144.13a5.5,5.5,0,0,0-.7-.9,2.15,2.15,0,0,0-3.1-2.6c-.1.1-.2.1-.3.2a.9.9,0,0,0-.5-.1,3.3,3.3,0,0,0-2.2.2c-1.6.3-3.3,1-3.3,2.9-.1,2.2,2,3.3,3.9,3.4h.1a3.53,3.53,0,0,0,1.4-.3,7.62,7.62,0,0,0,3.3.2C85.23,146.73,85.83,145.43,85,144.13Z\"/><path class=\"cls-5\" d=\"M86,141.43c-.2-.4-.3-.7-.5-1.1a1.38,1.38,0,0,0-.6-1.1c-.1-.2-.3-.3-.4-.5h0a13.42,13.42,0,0,0-8.2-4.8,1.06,1.06,0,0,0-.5,2,43.43,43.43,0,0,1,4.3,2.4c-3.6.3-8.3,1.9-7.5,6.5.7,4.1,5.2,5.5,8.7,4.4S87.63,145.13,86,141.43Zm-3,3.7c-1.5,1.7-5,2.5-6.8,1a2.44,2.44,0,0,1-.4-3.5c1.1-1.2,3.1-1.1,4.6-1.3,1.8-.2,2.2-.2,3.2.7S84,143.93,83,145.13Z\"/><ellipse class=\"cls-7\" cx=\"114.16\" cy=\"120.53\" rx=\"21\" ry=\"13.4\" transform=\"translate(-23.94 212.67) rotate(-80.26)\"/><ellipse class=\"cls-8\" cx=\"113.28\" cy=\"124.63\" rx=\"14.3\" ry=\"9.2\" transform=\"translate(-28.71 215.2) rotate(-80.26)\"/><ellipse class=\"cls-7\" cx=\"108.93\" cy=\"122.1\" rx=\"5.5\" ry=\"3.5\" transform=\"translate(-29.83 208.81) rotate(-80.26)\"/><ellipse class=\"cls-7\" cx=\"39.63\" cy=\"122.04\" rx=\"13.4\" ry=\"21\" transform=\"translate(-26.05 11.81) rotate(-12.8)\"/><ellipse class=\"cls-8\" cx=\"40.63\" cy=\"125.34\" rx=\"9.2\" ry=\"14.3\" transform=\"translate(-26.75 12.11) rotate(-12.8)\"/><ellipse class=\"cls-7\" cx=\"44.43\" cy=\"122.03\" rx=\"3.5\" ry=\"5.5\" transform=\"matrix(0.98, -0.22, 0.22, 0.98, -25.93, 12.87)\"/><path class=\"cls-1\" d=\"M130.73,152.13c0,13.4-30.2-19.1-51.8-20.2-30.1-1.5-57.4,33.5-57.4,20.2s24.4-25.3,54.6-25.3S130.73,138.83,130.73,152.13Z\"/><path class=\"cls-4\" d=\"M121.33,136.23c-11.8-5.5-28.4-10.6-45-10.6s-33.2,5-44.9,10.9c-.7.3-.4,1.7.3,1.4,11.9-5.1,32.4-10.1,45-10.2s32.3,5.1,44.2,10.4C121.83,138.53,122.23,136.63,121.33,136.23Z\"/><path class=\"cls-5\" d=\"M129,81.73a10.7,10.7,0,0,0-8.7-7.4c-3.3-.4-7.9.8-9.2,4.2-.3.8.7,1.3,1.3,1,2.5-1.1,4.3-2.8,7.3-2.4a7.9,7.9,0,0,1,6.5,5.4C126.93,84.33,129.73,83.53,129,81.73Z\"/><path class=\"cls-5\" d=\"M42.63,79.23c-3.2-2.7-8.3-2.8-12.2-1.7-3.4,1-8.1,3.5-7.6,7.7.2,1.8,3.1,1.9,2.9,0-.4-3.6,5.5-5.2,8.1-5.5s5.1.6,7.7,1.2C42.53,81.23,43.53,80,42.63,79.23Z\"/></g></g></svg>";

var script = {
  name: 'EmbettyEmbed',
  props: {
    serverUrl: {
      type: String,
      required: false,
      default: null
    }
  },

  /**
   * @returns {!object} Component's data.
   */
  data: function () {
    return {
      embettyLogo: EMBETTY_LOGO,
      fetched: false,
      data: undefined
    };
  },
  computed: {
    /**
     * Override this in child components!
     * @returns {string | undefined} The URL to query for data in this component.
     */
    url: function () {
      return undefined;
    },

    /**
     * @returns {!string} The server URL, either from this component's prop or the global config.
     */
    _serverUrl: function () {
      if (this.serverUrl) {
        return this.serverUrl;
      }

      if (!this._embettyVueOptions.serverUrl) {
        throw new Error('serverUrl is neither set directly on the ' + this.$vnode.tag + ' component nor globally.');
      }

      return this._embettyVueOptions.serverUrl;
    }
  },
  watch: {
    url: {
      immediate: true,

      /**
       * @param {?string} url The newly set URL.
       */
      handler: function (url) {
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
      // skip fetching in SSR
      if (typeof window === 'undefined') {
        return;
      }

      var thisCmp = this;
      window.fetch(this.url).then(function (response) {
        return response.json();
      }).then(function (data) {
        thisCmp.data = data;
        thisCmp.fetched = true;
      });
    },

    /**
     * @param {?string} apiEndpoint The API endpoint of the embetty-server.
     * @returns {?string} The given URL, prepended with the embetty-server base URL.
     */
    _api: function (apiEndpoint) {
      return apiEndpoint ? this._serverUrl + apiEndpoint : undefined;
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
const __vue_script__ = script;
/* template */

/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = normalizeComponent_1({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

var LINK_IMAGE_SIZE = 125;
var MIN_WINDOW_WIDTH = 600;
var script$1 = {
  name: 'EmbettyTweet',
  extends: __vue_component__,
  props: {
    status: {
      type: String,
      required: true,

      /**
       * @param {!string} statusId The Twitter status (tweet) ID.
       * @returns {!boolean} True if it seems like a valid status ID, false otherwise.
       */
      validator: function (statusId) {
        return /^\d{6,}$/.test(statusId);
      }
    },
    answered: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  /**
   * @returns {!object} The component's data.
   */
  data: function () {
    return {
      linkDescription: null
    };
  },
  computed: {
    /**
     * @override
     * @returns {!string} The embetty-server URL to query for this tweet's data.
     */
    url: function () {
      return this._api('/tweet/' + this.status);
    },

    /**
     * @returns {!string} The name of this tweet's user.
     */
    userName: function () {
      return this.data.user.name;
    },

    /**
     * @returns {!string} The twitter handle of this tweet's user.
     */
    screenName: function () {
      return this.data.user.screen_name;
    },

    /**
     * @returns {!string} The text content of this tweet. Can contain HTML links to URLs, hashtags and at-mentions.
     */
    fullText: function () {
      var thisCmp = this;
      return this.data.full_text.replace(/(https:\/\/[^\s]+)/g, function (link) {
        if (thisCmp.media.length > 0 && thisCmp.media[0].url === link) {
          return '';
        }

        return '<a href="' + link + '">' + link + '</a>';
      }).replace(/#(\w+)/g, function (hashtag, word) {
        return '<a href="https://twitter.com/hashtag/' + word + '">' + hashtag + '</a>';
      }).replace(/@(\w+)/g, function (name, word) {
        return '<a href="https://twitter.com/' + word + '">' + name + '</a>';
      });
    },

    /**
     * @returns {!array.<object>} An array of objects describing this tweet's attached photos.
     */
    media: function () {
      var thisCmp = this;
      var extended = this.data.extended_entities || {};
      var media = extended.media || [];
      return media.map(function (m, idx) {
        m.imageUrl = thisCmp.url + '-images-' + idx;
        return m;
      });
    },

    /**
     * @returns {!array.<object>} An array of objects describing this tweet's links.
     */
    links: function () {
      return this.data.entities.urls || [];
    },

    /**
     * @returns {?object} This tweet's first link object.
     */
    link: function () {
      return this.links[0];
    },

    /**
     * @returns {!string} The embetty-server URL for this tweet's first link's image.
     */
    linkImageUrl: function () {
      return this.url + '-link-image';
    },

    /**
     * @returns {?string} The hostname of this tweet's first link's URL.
     */
    linkHostname: function () {
      // adapted from https://stackoverflow.com/a/21553982/451391
      var match = this.link.url.match(/^.*?\/\/(([^:/?#]*)(?::([0-9]+))?)/);
      return match ? match[2] : undefined;
    },

    /**
     * @returns {!string} The embetty-server URL for this tweet's user profile image.
     */
    profileImageUrl: function () {
      return this.url + '-profile-image';
    },

    /**
     * @returns {!Date} A Date object containing this tweet's creation date.
     */
    createdAt: function () {
      var createdAt = this.data.created_at.replace(/\+\d{4}\s/, '');
      return new Date(createdAt);
    },

    /**
     * @returns {!string} The URL leading to this tweet on Twitter.
     */
    twitterUrl: function () {
      return 'https://twitter.com/' + this.screenName + '/status/' + this.data.id_str;
    },

    /**
     * @returns {?string} The status ID of the tweet that this tweet is a reply to, if any.
     */
    answeredTweetId: function () {
      return this.data.in_reply_to_status_id_str;
    },

    /**
     * @returns {!boolean} Whether this is a reply to another tweet.
     */
    isReply: function () {
      return !!this.answeredTweetId;
    }
  },

  /**
   * Hook that is called when this component is mounted. Calls fitLinkDescription
   * as soon as the data are fetched and whenever the window is resized.
   */
  mounted: function () {
    var thisCmp = this;
    this.$watch('fetched', function (fetched) {
      if (fetched) {
        thisCmp.fitLinkDescription();
      }
    }, {
      immediate: true
    });

    if (window) {
      window.addEventListener('resize', function () {
        if (window.innerWidth < MIN_WINDOW_WIDTH) {
          return;
        }

        thisCmp.fitLinkDescription();
      });
    }
  },
  methods: {
    /**
     * Truncate this tweet's first link's description to fit into the space it is given.
     */
    fitLinkDescription: function () {
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

      var sectionHeight = function () {
        var elemMarginTop = parseFloat(computedStyle.getPropertyValue('margin-top'));
        var elemMarginBottom = parseFloat(computedStyle.getPropertyValue('margin-bottom'));
        var elemHeight = parseFloat(computedStyle.getPropertyValue('height'));
        return elemHeight + elemMarginTop + elemMarginBottom;
      };

      var thisCmp = this;

      var reduceLinkDescriptionLength = function () {
        if (counter >= 200 || last === this.linkDescription) {
          return;
        }

        if (sectionHeight() - 2 <= imgHeight) {
          return;
        }

        last = thisCmp.linkDescription;
        thisCmp.linkDescription = thisCmp.linkDescription.replace(/\W*\s(\S)*$/, '…');
        counter++; // wait for Vue to render until we measure again

        thisCmp.$nextTick(reduceLinkDescriptionLength);
      };

      this.$nextTick(reduceLinkDescriptionLength);
    }
  }
};

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD;
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);

      if (HEAD === undefined) {
        HEAD = document.head || document.getElementsByTagName('head')[0];
      }

      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    class: {
      "embetty-tweet": true,
      answered: _vm.answered
    }
  }, [_vm.fetched ? [_vm.isReply ? _c("embetty-tweet", {
    attrs: {
      status: _vm.answeredTweetId,
      answered: true
    }
  }) : _vm._e(), _c("header", [_c("img", {
    attrs: {
      src: _vm.profileImageUrl
    }
  }), _c("span", [_c("strong", [_vm._v(_vm._s(_vm.userName))]), _c("a", {
    attrs: {
      href: "https://twitter.com/" + _vm.screenName,
      target: "_blank",
      rel: "noopener"
    }
  }, [_vm._v("@" + _vm._s(_vm.screenName))])])]), _c("article", [_c("p", {
    domProps: {
      innerHTML: _vm._s(_vm.fullText)
    }
  }), _vm.media.length > 0 ? _c("section", {
    class: "media media-" + _vm.media.length
  }, _vm._l(_vm.media, function (med) {
    return _c("a", {
      key: med.imageUrl,
      attrs: {
        href: med.imageUrl,
        target: "_blank"
      }
    }, [_c("img", {
      attrs: {
        src: med.imageUrl
      }
    })]);
  }), 0) : _vm._e(), _vm.links.length > 0 ? _c("a", {
    ref: "link",
    staticClass: "links",
    attrs: {
      href: _vm.link.url,
      target: "_blank",
      rel: "noopener"
    }
  }, [_c("img", {
    attrs: {
      src: _vm.linkImageUrl
    }
  }), _c("section", {
    ref: "linkBody",
    staticClass: "link-body"
  }, [_c("h3", [_vm._v(_vm._s(_vm.link.title))]), _vm.linkDescription ? _c("p", [_vm._v(_vm._s(_vm.linkDescription))]) : _vm._e(), _vm.linkHostname ? _c("span", [_vm._v(_vm._s(_vm.linkHostname))]) : _vm._e()])]) : _vm._e(), _c("a", {
    staticClass: "created-at",
    attrs: {
      href: _vm.twitterUrl,
      target: "_blank",
      rel: "noopener"
    }
  }, [_c("time", {
    attrs: {
      datetime: _vm.createdAt.toISOString()
    }
  }, [_vm._v(_vm._s(_vm.createdAt.toLocaleString()))]), _vm._v(" via Twitter "), _c("svg", {
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 400 400"
    }
  }, [_c("path", {
    staticStyle: {
      fill: "#1da1f2"
    },
    attrs: {
      d: "M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"
    }
  })])]), _c("a", {
    staticClass: "powered-by",
    attrs: {
      href: "https://www.heise.de/embetty?wt_mc=link.embetty.poweredby",
      target: "_blank",
      rel: "noopener",
      title: "embetty - displaying remote content without compromising your privacy."
    }
  }, [_vm._v(" powered by "), _c("span", {
    staticClass: "embetty-logo",
    domProps: {
      innerHTML: _vm._s(_vm.embettyLogo)
    }
  })])])] : _vm._e()], 2);
};

var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
/* style */

const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-41b5df95_0", {
    source: ".embetty-tweet.answered {\n  margin-top: 0;\n  margin-bottom: 0.5rem;\n  border: 0;\n  padding: 0;\n}\n.embetty-tweet.answered header {\n  padding-bottom: 0.5rem;\n}\n.embetty-tweet.answered article {\n  border-left: 4px solid #bbb;\n  margin-left: 16px;\n  padding-left: 2rem;\n  padding-bottom: 1rem;\n}\n.embetty-tweet.answered article p {\n  font-size: 14px;\n}\n.embetty-tweet.answered article .created-at {\n  display: none;\n}\n.embetty-tweet.answered .powered-by {\n  display: none;\n}\n.embetty-tweet {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  max-width: 100%;\n  font-family: var(--embetty-font-family, Helvetica, Roboto, \"Segoe UI\", Calibri, sans-serif);\n  border: 1px solid var(--embetty-border-color, #ccc);\n  border-width: 1px;\n  border-radius: 4px;\n  box-sizing: border-box;\n  font-size: 16px;\n  line-height: 1;\n  max-width: 642px;\n  padding: 1rem 1.2rem;\n}\n@media (min-width: 600px) {\n.embetty-tweet {\n    padding: 1.5rem 2rem;\n}\n}\n.embetty-tweet header {\n  display: flex;\n  align-items: center;\n  margin-bottom: 0.5rem;\n}\n.embetty-tweet header img {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n}\n.embetty-tweet header > span {\n  display: inline-block;\n  margin: 0 var(--embetty-spacing, 1rem);\n}\n.embetty-tweet header strong {\n  font-size: 16px;\n  display: block;\n}\n.embetty-tweet header a,\n.embetty-tweet header a:hover {\n  font-size: 14px;\n  color: #697882;\n  text-decoration: none;\n}\n.embetty-tweet article span {\n  display: block;\n}\n.embetty-tweet article p {\n  margin: 0 auto 0.5rem;\n  line-height: 1.4;\n  letter-spacing: 0.01em;\n}\n@media (min-width: 600px) {\n.embetty-tweet article p {\n    font-size: 18px;\n}\n}\n.embetty-tweet article p a {\n  color: #2b7bb9;\n  text-decoration: none;\n}\n.embetty-tweet article p a:hover {\n  color: #3b94d9;\n}\n.embetty-tweet article p a:focus {\n  text-decoration: underline;\n}\n.embetty-tweet .media a {\n  height: 100%;\n  display: flex;\n  align-items: center;\n}\n.embetty-tweet .media a:not(:first-child) {\n  display: none;\n}\n.embetty-tweet .media img {\n  max-width: 100%;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n@media (min-width: 600px) {\n.embetty-tweet .media {\n    display: grid;\n    grid-column-gap: 1px;\n    grid-row-gap: 1px;\n}\n.embetty-tweet .media a:not(:first-child) {\n    display: block;\n}\n.embetty-tweet .media.media-2 {\n    grid-template-columns: 50% 50%;\n}\n.embetty-tweet .media.media-3 {\n    grid-template-columns: auto 40%;\n}\n.embetty-tweet .media.media-3 a:first-child {\n    grid-row: 1/span 2;\n}\n.embetty-tweet .media.media-4 {\n    grid-template-columns: auto 20%;\n}\n.embetty-tweet .media.media-4 a:first-child {\n    grid-row: 1/span 3;\n}\n}\n.embetty-tweet .links {\n  border: 1px solid var(--embetty-border-color, #ccc);\n  border-width: 1px;\n  border-radius: 4px;\n  text-decoration: none;\n  display: flex;\n  flex-direction: column;\n  color: #14171a;\n  font-size: 14px;\n}\n.embetty-tweet .links:hover, .embetty-tweet .links:focus {\n  background-color: #f5f8fa;\n  border-color: rgba(136, 153, 166, 0.5);\n  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;\n}\n@media (min-width: 600px) {\n.embetty-tweet .links {\n    flex-direction: row;\n}\n}\n.embetty-tweet .links img {\n  max-width: 100%;\n  object-fit: cover;\n  display: inline-block;\n}\n@media (min-width: 600px) {\n.embetty-tweet .links img {\n    height: 125px;\n    width: 125px;\n    min-width: 125px;\n}\n}\n.embetty-tweet .links > *:last-child {\n  margin-bottom: 0;\n}\n.embetty-tweet .links .link-body {\n  padding: 0.5rem;\n}\n@media (min-width: 600px) {\n.embetty-tweet .links .link-body {\n    display: flex;\n    flex-direction: column;\n    padding: 0.5rem 0.8rem;\n}\n}\n.embetty-tweet .links h3 {\n  font-size: 14px;\n  line-height: 1.3;\n  margin: 0;\n  margin-bottom: 0.3em;\n}\n.embetty-tweet .links p {\n  display: none;\n}\n@media (min-width: 600px) {\n.embetty-tweet .links p {\n    display: block;\n    flex-grow: 1;\n    hyphens: auto;\n    line-height: 18px;\n    font-size: 14px;\n    margin: 0;\n    margin-bottom: 0.3em;\n}\n}\n.embetty-tweet .links span {\n  margin-top: auto;\n  color: #999;\n}\n.embetty-tweet .created-at {\n  margin-top: 0.5rem;\n  display: block;\n  font-size: 14px;\n  color: #777;\n  text-decoration: none;\n}\n.embetty-tweet .created-at svg {\n  height: 22px;\n  vertical-align: middle;\n}\n.embetty-tweet .powered-by {\n  position: absolute;\n  z-index: 3;\n  right: -20px;\n  bottom: 0px;\n  padding: 20px 46px 5px 20px;\n  font-size: 14px;\n  color: #777;\n  text-decoration: none;\n  opacity: 0.3;\n}\n.embetty-tweet .powered-by:hover, .embetty-tweet .powered-by:focus {\n  opacity: 1;\n}\n.embetty-tweet .powered-by .embetty-logo {\n  position: absolute;\n  right: 0;\n  bottom: -42px;\n  width: 40px;\n}\n\n/*# sourceMappingURL=EmbettyTweet.vue.map */",
    map: {
      "version": 3,
      "sources": ["/home/flo/www/embetty/embetty-vue/src/components/EmbettyTweet.vue", "EmbettyTweet.vue"],
      "names": [],
      "mappings": "AAoEA;EACA,aAAA;EACA,qBAAA;EACA,SAAA;EACA,UAAA;ACnEA;ADqEA;EACA,sBAAA;ACnEA;ADsEA;EACA,2BAAA;EACA,iBAAA;EACA,kBAAA;EACA,oBAAA;ACpEA;ADsEA;EACA,eAAA;ACpEA;ADuEA;EACA,aAAA;ACrEA;ADyEA;EACA,aAAA;ACvEA;AD2EA;ECxEE,kBAAkB;EAClB,gBAAgB;EAChB,cAAc;EACd,eAAe;EACf,2FAA2F;EAC3F,mDAAmD;EACnD,iBAAiB;EACjB,kBAAkB;EAClB,sBAAsB;EACtB,eAAe;EACf,cAAc;EDiEhB,gBAAA;EACA,oBAAA;AC/DA;ADiEA;AANA;IAOA,oBAAA;AC9DE;AACF;ADgEA;EACA,aAAA;EACA,mBAAA;EACA,qBAAA;AC9DA;ADgEA;EACA,WAjDA;EAkDA,YAlDA;EAmDA,kBAAA;AC9DA;ADiEA;EACA,qBAAA;EACA,sCAAA;AC/DA;ADkEA;EACA,eAAA;EACA,cAAA;AChEA;ADmEA;;EAEA,eAAA;EACA,cAAA;EACA,qBAAA;ACjEA;ADsEA;EACA,cAAA;ACpEA;ADuEA;EACA,qBAAA;EACA,gBAAA;EACA,sBAAA;ACrEA;ADuEA;AALA;IAMA,eAAA;ACpEE;AACF;ADsEA;EACA,cAAA;EACA,qBAAA;ACpEA;ADsEA;EACA,cAAA;ACpEA;ADuEA;EACA,0BAAA;ACrEA;AD4EA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;AC1EA;AD4EA;EACA,aAAA;AC1EA;AD8EA;EACA,eAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;AC5EA;AD+EA;AAlBA;IAmBA,aAAA;IACA,oBAAA;IACA,iBAAA;AC5EE;AD8EF;IACA,cAAA;AC5EE;AD+EF;IACA,8BAAA;AC7EE;ADgFF;IACA,+BAAA;AC9EE;ADgFF;IACA,kBAAA;AC9EE;ADkFF;IACA,+BAAA;AChFE;ADkFF;IACA,kBAAA;AChFE;AACF;ADqFA;EACA,mDAAA;EACA,iBAAA;EACA,kBAAA;EACA,qBAAA;EACA,aAAA;EACA,sBAAA;EACA,cAAA;EACA,eAAA;ACnFA;ADqFA;EAEA,yBAAA;EACA,sCAAA;EACA,8EAAA;ACpFA;ADuFA;AAjBA;IAkBA,mBAAA;ACpFE;AACF;ADsFA;EACA,eAAA;EACA,iBAAA;EACA,qBAAA;ACpFA;ADsFA;AALA;IAMA,aAAA;IACA,YAAA;IACA,gBAAA;ACnFE;AACF;ADsFA;EACA,gBAAA;ACpFA;ADuFA;EACA,eAAA;ACrFA;ADuFA;AAHA;IAIA,aAAA;IACA,sBAAA;IACA,sBAAA;ACpFE;AACF;ADuFA;EACA,eAAA;EACA,gBAAA;EACA,SAAA;EACA,oBAAA;ACrFA;ADwFA;EACA,aAAA;ACtFA;ADwFA;AAHA;IAIA,cAAA;IACA,YAAA;IACA,aAAA;IACA,iBAAA;IACA,eAAA;IACA,SAAA;IACA,oBAAA;ACrFE;AACF;ADwFA;EACA,gBAAA;EACA,WAAA;ACtFA;AD0FA;EACA,kBAAA;EACA,cAAA;EACA,eAAA;EACA,WAAA;EACA,qBAAA;ACxFA;AD0FA;EACA,YAAA;EACA,sBAAA;ACxFA;AD4FA;EC1FE,kBAAkB;EAClB,UAAU;EACV,YAAY;EACZ,WAAW;EACX,2BAA2B;EAC3B,eAAe;EACf,WAAW;EACX,qBAAqB;EACrB,YAAY;AACd;AACA;EACE,UAAU;AACZ;AACA;EACE,kBAAkB;EAClB,QAAQ;EACR,aAAa;EACb,WAAW;AACb;;AAEA,2CAA2C",
      "file": "EmbettyTweet.vue",
      "sourcesContent": ["<template>\n  <div :class=\"{'embetty-tweet': true, answered}\">\n    <template v-if=\"fetched\">\n      <embetty-tweet v-if=\"isReply\" :status=\"answeredTweetId\" :answered=\"true\" />\n      <header>\n        <img :src=\"profileImageUrl\">\n        <span>\n          <strong>{{ userName }}</strong>\n          <a :href=\"`https://twitter.com/${screenName}`\" target=\"_blank\" rel=\"noopener\">@{{ screenName }}</a>\n        </span>\n      </header>\n      <article>\n        <p v-html=\"fullText\" />\n        <section v-if=\"media.length > 0\" :class=\"`media media-${media.length}`\">\n          <a\n            v-for=\"med in media\"\n            :key=\"med.imageUrl\"\n            :href=\"med.imageUrl\"\n            target=\"_blank\">\n            <img :src=\"med.imageUrl\">\n          </a>\n        </section>\n\n        <a\n          v-if=\"links.length > 0\"\n          ref=\"link\"\n          :href=\"link.url\"\n          target=\"_blank\"\n          rel=\"noopener\"\n          class=\"links\">\n          <img :src=\"linkImageUrl\">\n          <section ref=\"linkBody\" class=\"link-body\">\n            <h3>{{ link.title }}</h3>\n            <p v-if=\"linkDescription\">{{ linkDescription }}</p>\n            <span v-if=\"linkHostname\">{{ linkHostname }}</span>\n          </section>\n        </a>\n\n        <a\n          :href=\"twitterUrl\"\n          target=\"_blank\"\n          rel=\"noopener\"\n          class=\"created-at\">\n          <time :datetime=\"createdAt.toISOString()\">{{ createdAt.toLocaleString() }}</time>\n          via Twitter\n          <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 400\"><path style=\"fill:#1da1f2;\" d=\"M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23\" /></svg>\n        </a>\n\n        <a\n          href=\"https://www.heise.de/embetty?wt_mc=link.embetty.poweredby\"\n          target=\"_blank\"\n          rel=\"noopener\"\n          class=\"powered-by\"\n          title=\"embetty - displaying remote content without compromising your privacy.\">\n          powered by <span class=\"embetty-logo\" v-html=\"embettyLogo\" />\n        </a>\n      </article>\n    </template>\n  </div>\n</template>\n\n<style lang=\"scss\">\n@import '../assets/element.scss';\n@import '../assets/vars.scss';\n\n$profile-image-width: 36px;\n$quoteLineWidth: 4px;\n\n.embetty-tweet.answered {\n  margin-top: 0;\n  margin-bottom: 0.5rem;\n  border: 0;\n  padding: 0;\n\n  header {\n    padding-bottom: 0.5rem;\n  }\n\n  article {\n    border-left: $quoteLineWidth solid #bbb;\n    margin-left: $profile-image-width / 2 - $quoteLineWidth / 2;\n    padding-left: 2rem;\n    padding-bottom: 1rem;\n\n    p {\n      font-size: 14px;\n    }\n\n    .created-at {\n      display: none;\n    }\n  }\n\n  .powered-by {\n    display: none;\n  }\n}\n\n.embetty-tweet {\n  @include host();\n\n  max-width: 642px;\n  padding: 1rem 1.2rem;\n\n  @media (min-width: 600px) {\n    padding: 1.5rem 2rem;\n  }\n\n  header {\n    display: flex;\n    align-items: center;\n    margin-bottom: .5rem;\n\n    img {\n      width: $profile-image-width;\n      height: $profile-image-width;\n      border-radius: 50%;\n    }\n\n    > span {\n      display: inline-block;\n      margin: 0 var(--embetty-spacing, $embetty-spacing);\n    }\n\n    strong {\n      font-size: 16px;\n      display: block;\n    }\n\n    a,\n    a:hover {\n      font-size: 14px;\n      color: #697882;\n      text-decoration: none;\n    }\n  }\n\n  article {\n    span {\n      display: block;\n    }\n\n    p {\n      margin: 0 auto 0.5rem;\n      line-height: 1.4;\n      letter-spacing: .01em;\n\n      @media (min-width: 600px) {\n        font-size: 18px;\n      }\n\n      a {\n        color: #2b7bb9;\n        text-decoration: none;\n\n        &:hover {\n          color: #3b94d9;\n        }\n\n        &:focus {\n          text-decoration: underline;\n        }\n      }\n    }\n  }\n\n  .media {\n    a {\n      height: 100%;\n      display: flex;\n      align-items: center;\n\n      &:not(:first-child) {\n        display: none;\n      }\n    }\n\n    img {\n      max-width: 100%;\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n    }\n\n    @media (min-width: 600px) {\n      display: grid;\n      grid-column-gap: 1px;\n      grid-row-gap: 1px;\n\n      a:not(:first-child) {\n        display: block;\n      }\n\n      &.media-2 {\n        grid-template-columns: 50% 50%;\n      }\n\n      &.media-3 {\n        grid-template-columns: auto 40%;\n\n        a:first-child {\n          grid-row: 1 / span 2;\n        }\n      }\n\n      &.media-4 {\n        grid-template-columns: auto 20%;\n\n        a:first-child {\n          grid-row: 1 / span 3;\n        }\n      }\n    }\n  }\n\n  .links {\n    border: 1px solid var(--embetty-border-color, $embetty-border-color);\n    border-width: 1px;\n    border-radius: 4px;\n    text-decoration: none;\n    display: flex;\n    flex-direction: column;\n    color: #14171a;\n    font-size: 14px;\n\n    &:hover,\n    &:focus {\n      background-color: rgb(245, 248, 250);\n      border-color: rgba(136,153,166,.5);\n      transition: background-color .15s ease-in-out, border-color .15s ease-in-out;\n    }\n\n    @media (min-width: 600px) {\n      flex-direction: row;\n    }\n\n    img {\n      max-width: 100%;\n      object-fit: cover;\n      display: inline-block;\n\n      @media (min-width: 600px) {\n        height: 125px;\n        width: 125px;\n        min-width: 125px;\n      }\n    }\n\n    & > *:last-child {\n      margin-bottom: 0;\n    }\n\n    .link-body {\n      padding: .5rem;\n\n      @media (min-width: 600px) {\n        display: flex;\n        flex-direction: column;\n        padding: .5rem .8rem;\n      }\n    }\n\n    h3 {\n      font-size: 14px;\n      line-height: 1.3;\n      margin: 0;\n      margin-bottom: .3em;\n    }\n\n    p {\n      display: none;\n\n      @media (min-width: 600px) {\n        display: block;\n        flex-grow: 1;\n        hyphens: auto;\n        line-height: 18px;\n        font-size: 14px;\n        margin: 0;\n        margin-bottom: .3em;\n      }\n    }\n\n    span {\n      margin-top: auto;\n      color: #999;\n    }\n  }\n\n  .created-at {\n    margin-top: .5rem;\n    display: block;\n    font-size: 14px;\n    color: #777;\n    text-decoration: none;\n\n    svg {\n      height: 22px;\n      vertical-align: middle;\n    }\n  }\n\n  .powered-by {\n    @include powered-by();\n  }\n}\n</style>\n\n<script>\nimport EmbettyEmbed from './EmbettyEmbed.vue';\n\nvar LINK_IMAGE_SIZE = 125;\nvar MIN_WINDOW_WIDTH = 600;\n\nexport default {\n  name: 'EmbettyTweet',\n  extends: EmbettyEmbed,\n  props: {\n    status: {\n      type: String,\n      required: true,\n      /**\n       * @param {!string} statusId The Twitter status (tweet) ID.\n       * @returns {!boolean} True if it seems like a valid status ID, false otherwise.\n       */\n      validator: function(statusId) {\n        return /^\\d{6,}$/.test(statusId);\n      }\n    },\n    answered: {\n      type: Boolean,\n      required: false,\n      default: false\n    }\n  },\n  /**\n   * @returns {!object} The component's data.\n   */\n  data: function() {\n    return {\n      linkDescription: null\n    };\n  },\n  computed: {\n    /**\n     * @override\n     * @returns {!string} The embetty-server URL to query for this tweet's data.\n     */\n    url: function() {\n      return this._api('/tweet/' + this.status);\n    },\n\n    /**\n     * @returns {!string} The name of this tweet's user.\n     */\n    userName: function() {\n      return this.data.user.name;\n    },\n\n    /**\n     * @returns {!string} The twitter handle of this tweet's user.\n     */\n    screenName: function() {\n      return this.data.user.screen_name;\n    },\n\n    /**\n     * @returns {!string} The text content of this tweet. Can contain HTML links to URLs, hashtags and at-mentions.\n     */\n    fullText: function() {\n      var thisCmp = this;\n      return this.data.full_text\n        .replace(/(https:\\/\\/[^\\s]+)/g, function(link) {\n          if (thisCmp.media.length > 0 && thisCmp.media[0].url === link) {\n            return '';\n          }\n\n          return '<a href=\"' + link + '\">' + link + '</a>';\n        })\n        .replace(/#(\\w+)/g, function(hashtag, word) {\n          return '<a href=\"https://twitter.com/hashtag/' + word + '\">' + hashtag + '</a>';\n        })\n        .replace(/@(\\w+)/g, function(name, word) {\n          return '<a href=\"https://twitter.com/' + word + '\">' + name + '</a>';\n        });\n    },\n\n    /**\n     * @returns {!array.<object>} An array of objects describing this tweet's attached photos.\n     */\n    media: function() {\n      var thisCmp = this;\n      var extended = this.data.extended_entities || {};\n      var media = extended.media || [];\n      return media.map(function(m, idx) {\n        m.imageUrl = thisCmp.url + '-images-' + idx;\n        return m;\n      });\n    },\n\n    /**\n     * @returns {!array.<object>} An array of objects describing this tweet's links.\n     */\n    links: function() {\n      return this.data.entities.urls || [];\n    },\n\n    /**\n     * @returns {?object} This tweet's first link object.\n     */\n    link: function() {\n      return this.links[0];\n    },\n\n    /**\n     * @returns {!string} The embetty-server URL for this tweet's first link's image.\n     */\n    linkImageUrl: function() {\n      return this.url + '-link-image';\n    },\n\n    /**\n     * @returns {?string} The hostname of this tweet's first link's URL.\n     */\n    linkHostname: function() {\n      // adapted from https://stackoverflow.com/a/21553982/451391\n      var match = this.link.url.match(/^.*?\\/\\/(([^:/?#]*)(?::([0-9]+))?)/);\n      return match ? match[2] : undefined;\n    },\n\n    /**\n     * @returns {!string} The embetty-server URL for this tweet's user profile image.\n     */\n    profileImageUrl: function() {\n      return this.url + '-profile-image';\n    },\n\n    /**\n     * @returns {!Date} A Date object containing this tweet's creation date.\n     */\n    createdAt: function() {\n      var createdAt = this.data.created_at.replace(/\\+\\d{4}\\s/, '');\n      return new Date(createdAt);\n    },\n\n    /**\n     * @returns {!string} The URL leading to this tweet on Twitter.\n     */\n    twitterUrl: function() {\n      return 'https://twitter.com/'+ this.screenName +'/status/' + this.data.id_str;\n    },\n\n    /**\n     * @returns {?string} The status ID of the tweet that this tweet is a reply to, if any.\n     */\n    answeredTweetId: function() {\n      return this.data.in_reply_to_status_id_str;\n    },\n\n    /**\n     * @returns {!boolean} Whether this is a reply to another tweet.\n     */\n    isReply: function() {\n      return !!this.answeredTweetId;\n    }\n  },\n\n  /**\n   * Hook that is called when this component is mounted. Calls fitLinkDescription\n   * as soon as the data are fetched and whenever the window is resized.\n   */\n  mounted: function() {\n    var thisCmp = this;\n    this.$watch('fetched', function(fetched) {\n      if (fetched) {\n        thisCmp.fitLinkDescription();\n      }\n    }, {\n      immediate: true\n    });\n\n    if (window) {\n      window.addEventListener('resize', function() {\n        if (window.innerWidth < MIN_WINDOW_WIDTH) {\n          return;\n        }\n\n        thisCmp.fitLinkDescription();\n      });\n    }\n  },\n  methods: {\n    /**\n     * Truncate this tweet's first link's description to fit into the space it is given.\n     */\n    fitLinkDescription: function() {\n      if (!this.link || !window) {\n        return;\n      }\n\n      // reset link description to the one returned by the API\n      this.linkDescription = this.link.description;\n\n      if (!this.linkDescription) {\n        return;\n      }\n\n      /** @type Element */\n      var section = this.$refs.link;\n      /** @type Element */\n      var linkBody = this.$refs.linkBody;\n\n      // don't do anything if the mobile view is active\n      if (section.clientWidth === linkBody.clientWidth) {\n        return;\n      }\n\n      var imgHeight = LINK_IMAGE_SIZE;\n      var counter = 0;\n      var last = '';\n\n      var computedStyle = window.getComputedStyle(section);\n\n      var sectionHeight = function() {\n        var elemMarginTop = parseFloat(computedStyle.getPropertyValue('margin-top'));\n        var elemMarginBottom = parseFloat(computedStyle.getPropertyValue('margin-bottom'));\n        var elemHeight = parseFloat(computedStyle.getPropertyValue('height'));\n\n        return elemHeight + elemMarginTop + elemMarginBottom;\n      };\n\n      var thisCmp = this;\n      var reduceLinkDescriptionLength = function() {\n        if (counter >= 200 || last === this.linkDescription) {\n          return;\n        }\n\n        if ((sectionHeight() - 2) <= imgHeight) {\n          return;\n        }\n\n        last = thisCmp.linkDescription;\n        thisCmp.linkDescription = thisCmp.linkDescription.replace(/\\W*\\s(\\S)*$/, '…');\n        counter++;\n\n        // wait for Vue to render until we measure again\n        thisCmp.$nextTick(reduceLinkDescriptionLength);\n      };\n\n      this.$nextTick(reduceLinkDescriptionLength);\n    }\n  }\n};\n</script>\n", ".embetty-tweet.answered {\n  margin-top: 0;\n  margin-bottom: 0.5rem;\n  border: 0;\n  padding: 0;\n}\n.embetty-tweet.answered header {\n  padding-bottom: 0.5rem;\n}\n.embetty-tweet.answered article {\n  border-left: 4px solid #bbb;\n  margin-left: 16px;\n  padding-left: 2rem;\n  padding-bottom: 1rem;\n}\n.embetty-tweet.answered article p {\n  font-size: 14px;\n}\n.embetty-tweet.answered article .created-at {\n  display: none;\n}\n.embetty-tweet.answered .powered-by {\n  display: none;\n}\n\n.embetty-tweet {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  max-width: 100%;\n  font-family: var(--embetty-font-family, Helvetica, Roboto, \"Segoe UI\", Calibri, sans-serif);\n  border: 1px solid var(--embetty-border-color, #ccc);\n  border-width: 1px;\n  border-radius: 4px;\n  box-sizing: border-box;\n  font-size: 16px;\n  line-height: 1;\n  max-width: 642px;\n  padding: 1rem 1.2rem;\n}\n@media (min-width: 600px) {\n  .embetty-tweet {\n    padding: 1.5rem 2rem;\n  }\n}\n.embetty-tweet header {\n  display: flex;\n  align-items: center;\n  margin-bottom: 0.5rem;\n}\n.embetty-tweet header img {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n}\n.embetty-tweet header > span {\n  display: inline-block;\n  margin: 0 var(--embetty-spacing, 1rem);\n}\n.embetty-tweet header strong {\n  font-size: 16px;\n  display: block;\n}\n.embetty-tweet header a,\n.embetty-tweet header a:hover {\n  font-size: 14px;\n  color: #697882;\n  text-decoration: none;\n}\n.embetty-tweet article span {\n  display: block;\n}\n.embetty-tweet article p {\n  margin: 0 auto 0.5rem;\n  line-height: 1.4;\n  letter-spacing: 0.01em;\n}\n@media (min-width: 600px) {\n  .embetty-tweet article p {\n    font-size: 18px;\n  }\n}\n.embetty-tweet article p a {\n  color: #2b7bb9;\n  text-decoration: none;\n}\n.embetty-tweet article p a:hover {\n  color: #3b94d9;\n}\n.embetty-tweet article p a:focus {\n  text-decoration: underline;\n}\n.embetty-tweet .media a {\n  height: 100%;\n  display: flex;\n  align-items: center;\n}\n.embetty-tweet .media a:not(:first-child) {\n  display: none;\n}\n.embetty-tweet .media img {\n  max-width: 100%;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n@media (min-width: 600px) {\n  .embetty-tweet .media {\n    display: grid;\n    grid-column-gap: 1px;\n    grid-row-gap: 1px;\n  }\n  .embetty-tweet .media a:not(:first-child) {\n    display: block;\n  }\n  .embetty-tweet .media.media-2 {\n    grid-template-columns: 50% 50%;\n  }\n  .embetty-tweet .media.media-3 {\n    grid-template-columns: auto 40%;\n  }\n  .embetty-tweet .media.media-3 a:first-child {\n    grid-row: 1/span 2;\n  }\n  .embetty-tweet .media.media-4 {\n    grid-template-columns: auto 20%;\n  }\n  .embetty-tweet .media.media-4 a:first-child {\n    grid-row: 1/span 3;\n  }\n}\n.embetty-tweet .links {\n  border: 1px solid var(--embetty-border-color, #ccc);\n  border-width: 1px;\n  border-radius: 4px;\n  text-decoration: none;\n  display: flex;\n  flex-direction: column;\n  color: #14171a;\n  font-size: 14px;\n}\n.embetty-tweet .links:hover, .embetty-tweet .links:focus {\n  background-color: #f5f8fa;\n  border-color: rgba(136, 153, 166, 0.5);\n  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;\n}\n@media (min-width: 600px) {\n  .embetty-tweet .links {\n    flex-direction: row;\n  }\n}\n.embetty-tweet .links img {\n  max-width: 100%;\n  object-fit: cover;\n  display: inline-block;\n}\n@media (min-width: 600px) {\n  .embetty-tweet .links img {\n    height: 125px;\n    width: 125px;\n    min-width: 125px;\n  }\n}\n.embetty-tweet .links > *:last-child {\n  margin-bottom: 0;\n}\n.embetty-tweet .links .link-body {\n  padding: 0.5rem;\n}\n@media (min-width: 600px) {\n  .embetty-tweet .links .link-body {\n    display: flex;\n    flex-direction: column;\n    padding: 0.5rem 0.8rem;\n  }\n}\n.embetty-tweet .links h3 {\n  font-size: 14px;\n  line-height: 1.3;\n  margin: 0;\n  margin-bottom: 0.3em;\n}\n.embetty-tweet .links p {\n  display: none;\n}\n@media (min-width: 600px) {\n  .embetty-tweet .links p {\n    display: block;\n    flex-grow: 1;\n    hyphens: auto;\n    line-height: 18px;\n    font-size: 14px;\n    margin: 0;\n    margin-bottom: 0.3em;\n  }\n}\n.embetty-tweet .links span {\n  margin-top: auto;\n  color: #999;\n}\n.embetty-tweet .created-at {\n  margin-top: 0.5rem;\n  display: block;\n  font-size: 14px;\n  color: #777;\n  text-decoration: none;\n}\n.embetty-tweet .created-at svg {\n  height: 22px;\n  vertical-align: middle;\n}\n.embetty-tweet .powered-by {\n  position: absolute;\n  z-index: 3;\n  right: -20px;\n  bottom: 0px;\n  padding: 20px 46px 5px 20px;\n  font-size: 14px;\n  color: #777;\n  text-decoration: none;\n  opacity: 0.3;\n}\n.embetty-tweet .powered-by:hover, .embetty-tweet .powered-by:focus {\n  opacity: 1;\n}\n.embetty-tweet .powered-by .embetty-logo {\n  position: absolute;\n  right: 0;\n  bottom: -42px;\n  width: 40px;\n}\n\n/*# sourceMappingURL=EmbettyTweet.vue.map */"]
    },
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$1 = undefined;
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = normalizeComponent_1({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, browser, undefined, undefined);

/** @type VideoImpl */
var FacebookVideo = {
  /**
   * @param {!string} videoId The ID of the video.
   * @returns {?string} The embetty-server API endpoint to get the video data from.
   */
  getVideoDataApiEndpoint: function (videoId) {
    return '/video/facebook/' + videoId;
  },

  /**
   * @param {!string} videoId The ID of the video.
   * @returns {!string} The embetty-server API endpoint to get the poster image from.
   */
  getPosterImageApiEndpoint: function (videoId) {
    return '/video/facebook/' + videoId + '-poster-image';
  },

  /**
   * @param {!VideoData} videoData All data required to render the video iframe.
   * @returns {!string} The <iframe> playing the video.
   */
  getIframe: function (videoData) {
    var canonicalUrl = encodeURIComponent(videoData.serverData.canonicalUrl);
    var iframeSrc = 'https://www.facebook.com/plugins/video.php?href=' + canonicalUrl + '&show_text=0&autoplay=1&mute=0&width=' + videoData.width;
    return '<iframe ' + 'src="' + iframeSrc + '" ' + 'width="' + videoData.width + '" ' + 'height="' + videoData.height + '" ' + 'frameborder="0" ' + 'webkitallowfullscreen ' + 'mozallowfullscreen ' + 'msallowfullscreen ' + 'allowfullscreen></iframe>';
  }
};

/** @type VideoImpl */
var NativeVideo = {
  /**
   * @param {!string} videoId The ID of the video.
   * @returns {?string} undefined because no additional video data are required for native videos.
   */
  getVideoDataApiEndpoint: function (videoId) {
    return undefined;
  },

  /**
   * @param {!string} videoId The ID of the video.
   * @returns {?string} undefined because poster images for native videos are not yet supported by the server.
   */
  getPosterImageApiEndpoint: function (videoId) {
    return undefined;
  },

  /**
   * @param {!VideoData} videoData All data required to render the video element.
   * @returns {!string} The <video> element playing the video.
   */
  getIframe: function (videoData) {
    return '<video width="' + videoData.width + '" height="' + videoData.height + '" autoplay controls>' + '<source src="' + videoData.videoId + '" />' + '</video>';
  }
};

/** @type VideoImpl */
var VimeoVideo = {
  /**
   * @param {!string} videoId The ID of the video.
   * @returns {?string} undefined because no additional video data are required for Vimeo.
   */
  getVideoDataApiEndpoint: function (videoId) {
    return undefined;
  },

  /**
   * @param {!string} videoId The ID of the video.
   * @returns {!string} The embetty-server API endpoint to get the poster image from.
   */
  getPosterImageApiEndpoint: function (videoId) {
    return '/video/vimeo/' + videoId + '-poster-image';
  },

  /**
   * @param {!VideoData} videoData All data required to render the video iframe.
   * @returns {!string} The <iframe> playing the video.
   */
  getIframe: function (videoData) {
    return '<iframe ' + 'src="https://player.vimeo.com/video/' + videoData.videoId + '?autoplay=1#t=' + videoData.startAt + '" ' + 'width="' + videoData.width + '" ' + 'height="' + videoData.height + '" ' + 'frameborder="0" ' + 'webkitallowfullscreen ' + 'mozallowfullscreen ' + 'msallowfullscreen ' + 'allowfullscreen></iframe>';
  }
};

/** @type VideoImpl */
var YoutubeVideo = {
  /**
   * @param {!string} videoId The ID of the video.
   * @returns {?string} undefined because no additional video data are required for YouTube.
   */
  getVideoDataApiEndpoint: function (videoId) {
    return undefined;
  },

  /**
   * @param {!string} videoId The ID of the video.
   * @returns {!string} The embetty-server API endpoint to get the poster image from.
   */
  getPosterImageApiEndpoint: function (videoId) {
    return '/video/youtube/' + videoId + '-poster-image';
  },

  /**
   * @param {!VideoData} videoData All data required to render the video iframe.
   * @returns {!string} The <iframe> playing the video.
   */
  getIframe: function (videoData) {
    return '<iframe ' + 'src="https://www.youtube-nocookie.com/embed/' + videoData.videoId + '?autoplay=1&start=' + videoData.startAt + '" ' + 'width="' + videoData.width + '" ' + 'height="' + videoData.height + '" ' + 'frameborder="0" ' + 'allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"' + 'webkitallowfullscreen ' + 'mozallowfullscreen ' + 'msallowfullscreen ' + 'allowfullscreen></iframe>';
  }
};

var videoImplementations = {
  facebook: FacebookVideo,
  native: NativeVideo,
  vimeo: VimeoVideo,
  youtube: YoutubeVideo
};

//
var script$2 = {
  name: 'EmbettyVideo',
  extends: __vue_component__,
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

      /**
       * @param {!string} videoType The type of the video.
       * @returns {!boolean} True if it is a valid type, false otherwise.
       */
      validator: function (videoType) {
        return videoType in videoImplementations;
      }
    },
    videoId: {
      type: String,
      required: true,

      /**
       * @param {!string} videoId The ID of the video.
       * @returns {!boolean} True if it seems like a valid video ID, false otherwise.
       */
      validator: function (videoId) {
        return /^[a-zA-Z0-9_-]{6,}$/.test(videoId) || videoId.startsWith('http');
      }
    },
    startAt: {
      type: [Number, String],
      required: false,
      default: 0,

      /**
       * @param {!number} startAt The number of seconds to start playback after.
       * @returns {!boolean} True if it is a non-negative integer, false otherwise.
       */
      validator: function (startAt) {
        if (typeof startAt === 'number') {
          return startAt % 1 === 0 && startAt >= 0;
        }

        return /^(?:(?:\d+h)?\d+m)?\d+s?$/.test(startAt);
      }
    },
    posterImageMode: {
      type: String,
      required: false,
      default: null
    }
  },

  /**
   * @returns {!object} The component's data.
   */
  data: function () {
    return {
      activated: false
    };
  },
  computed: {
    /**
     * @returns {!VideoImpl} The video implementation, based on the video type.
     * @throws {!Error} If there is no video implementation for the given type.
     */
    impl: function () {
      if (!(this.type in videoImplementations)) {
        throw new Error('Could not find video implementation for type ' + this.type + '. Please specify a valid video type.');
      }

      return videoImplementations[this.type];
    },

    /**
     * @returns {!string} The embetty-server URL for the video poster image.
     */
    posterImageUrl: function () {
      return this._api(this.impl.getPosterImageApiEndpoint(this.videoId));
    },

    /**
     * @returns {!string} The poster image mode.
     */
    _posterImageMode: function () {
      return this.posterImageMode || this._embettyVueOptions.posterImageMode || 'cover';
    },

    /**
     * @returns {!number} The number of seconds the video should start at.
     */
    _startAt: function () {
      if (typeof this.startAt === 'number') {
        return this.startAt;
      }

      var timeRegex = /^(?:(?:(\d+)h)?(\d+)m)?(\d+)s?$/;
      var timeMatch = this.startAt.match(timeRegex);

      if (timeMatch) {
        // '1m16s'    -> timeMatch = ['1m16s',    undefined, '1', '16']
        // '1h23m45s' -> timeMatch = ['1h23m45s', '1',       '2', '34']
        var timeNumbers = timeMatch.map(function (val) {
          if (val === undefined) {
            return 0;
          }

          return parseInt(val);
        });
        var hours = timeNumbers[1];
        var minutes = timeNumbers[2];
        var seconds = timeNumbers[3];
        return hours * 3600 + minutes * 60 + seconds;
      }

      return 0;
    },

    /**
     * @override
     * @returns {?string} The embetty-server URL to fetch video data from, or undefined
     *                    if this video does not require additional data.
     */
    url: function () {
      return this._api(this.impl.getVideoDataApiEndpoint(this.videoId));
    },

    /**
     * @returns {!string} The HTML for the <iframe> this component renders upon activating.
     */
    iframe: function () {
      return this.impl.getIframe({
        width: this.width || 1600,
        height: this.height || 900,
        videoId: this.videoId,
        startAt: this._startAt,
        serverData: this.data
      });
    }
  },
  methods: {
    /**
     * Activates the video, i.e. replaces the poster image and play button with the iframe.
     */
    activate: function () {
      this.activated = true;
      this.$emit('activated');
    }
  }
};

/* script */
const __vue_script__$2 = script$2;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "embetty-video",
    style: _vm.width === null ? "" : "width: " + _vm.width + "px"
  }, [_vm.activated ? _c("div", {
    staticClass: "wrapper",
    class: {
      "default-height": _vm.height === null
    },
    style: _vm.height === null ? "" : "height: " + _vm.height + "px",
    domProps: {
      innerHTML: _vm._s(_vm.iframe)
    }
  }) : [_c("button", {
    staticClass: "playbutton",
    attrs: {
      type: "button"
    },
    on: {
      click: _vm.activate
    }
  }, [_c("svg", {
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      width: "72",
      height: "72",
      viewBox: "0 0 48 48",
      fill: "#fff"
    }
  }, [_c("path", {
    attrs: {
      d: "M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 29V15l12 9-12 9z"
    }
  })])]), _c("div", {
    class: {
      poster: true,
      "default-height": _vm.height === null,
      contain: _vm.posterImageMode === "contain"
    },
    style: [_vm.posterImageUrl ? {
      backgroundImage: "url(" + _vm.posterImageUrl + ")"
    } : {}, _vm.height === null ? {} : {
      height: _vm.height + "px"
    }]
  }), _c("a", {
    staticClass: "powered-by",
    attrs: {
      href: "https://www.heise.de/embetty",
      target: "_blank",
      rel: "noopener",
      title: "embetty - displaying remote content without compromising your privacy."
    }
  }, [_vm._v(" powered by "), _c("span", {
    staticClass: "embetty-logo",
    domProps: {
      innerHTML: _vm._s(_vm.embettyLogo)
    }
  })])]], 2);
};

var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;
/* style */

const __vue_inject_styles__$2 = function (inject) {
  if (!inject) return;
  inject("data-v-78868f83_0", {
    source: ".embetty-video {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  max-width: 100%;\n  font-family: var(--embetty-font-family, Helvetica, Roboto, \"Segoe UI\", Calibri, sans-serif);\n  border: 1px solid var(--embetty-border-color, #ccc);\n  border-width: 1px;\n  border-radius: 4px;\n  box-sizing: border-box;\n  font-size: 16px;\n  line-height: 1;\n}\n.embetty-video .poster, .embetty-video .wrapper {\n  position: relative;\n  overflow: hidden;\n  background: no-repeat center black;\n  background-size: cover;\n}\n.embetty-video .poster.contain, .embetty-video .wrapper.contain {\n  background-size: contain;\n}\n.embetty-video .poster.default-height, .embetty-video .wrapper.default-height {\n  height: 0;\n  padding-top: 56.25%;\n}\n.embetty-video .playbutton,\n.embetty-video .playbutton:active {\n  box-sizing: border-box;\n  display: block;\n  position: absolute;\n  z-index: 1;\n  width: 100%;\n  height: 100%;\n  border: 0;\n  padding: 0;\n  outline: 0;\n  opacity: 0.9;\n  background: none;\n  cursor: pointer;\n  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8));\n  transition: opacity 150ms;\n}\n.embetty-video .playbutton:hover, .embetty-video .playbutton:focus,\n.embetty-video .playbutton:active:hover,\n.embetty-video .playbutton:active:focus {\n  opacity: 1;\n}\n.embetty-video .powered-by {\n  position: absolute;\n  z-index: 3;\n  right: -20px;\n  bottom: 0px;\n  padding: 20px 46px 5px 20px;\n  font-size: 14px;\n  color: #777;\n  text-decoration: none;\n  opacity: 0.3;\n  -webkit-font-smoothing: antialiased;\n  color: #fff;\n  opacity: 0.6;\n}\n.embetty-video .powered-by:hover, .embetty-video .powered-by:focus {\n  opacity: 1;\n}\n.embetty-video .powered-by .embetty-logo {\n  position: absolute;\n  right: 0;\n  bottom: -42px;\n  width: 40px;\n}\n.embetty-video iframe,\n.embetty-video video {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n\n/*# sourceMappingURL=EmbettyVideo.vue.map */",
    map: {
      "version": 3,
      "sources": ["/home/flo/www/embetty/embetty-vue/src/components/EmbettyVideo.vue", "EmbettyVideo.vue"],
      "names": [],
      "mappings": "AA4CA;EC3CE,kBAAkB;EAClB,gBAAgB;EAChB,cAAc;EACd,eAAe;EACf,2FAA2F;EAC3F,mDAAmD;EACnD,iBAAiB;EACjB,kBAAkB;EAClB,sBAAsB;EACtB,eAAe;EACf,cAAc;AAChB;ADmCA;EACA,kBAAA;EACA,gBAAA;EACA,kCAAA;EACA,sBAAA;ACjCA;ADmCA;EACA,wBAAA;ACjCA;ADoCA;EACA,SAAA;EACA,mBAAA;AClCA;ADsCA;;EAEA,sBAAA;EACA,cAAA;EACA,kBAAA;EACA,UAAA;EACA,WAAA;EACA,YAAA;EACA,SAAA;EACA,UAAA;EACA,UAAA;EACA,YAAA;EACA,gBAAA;EACA,eAAA;EACA,yEAAA;EACA,yBAAA;ACpCA;ADsCA;;;EAEA,UAAA;ACnCA;ADuCA;ECrCE,kBAAkB;EAClB,UAAU;EACV,YAAY;EACZ,WAAW;EACX,2BAA2B;EAC3B,eAAe;EACf,WAAW;EACX,qBAAqB;EACrB,YAAY;EDgCd,mCAAA;EAEA,WAAA;EACA,YAAA;AC/BA;AACA;EACE,UAAU;AACZ;AACA;EACE,kBAAkB;EAClB,QAAQ;EACR,aAAa;EACb,WAAW;AACb;ADyBA;;EAEA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,WAAA;EACA,YAAA;ACvBA;;AAEA,2CAA2C",
      "file": "EmbettyVideo.vue",
      "sourcesContent": ["<template>\n  <div :style=\"width === null ? `` : `width: ${width}px`\" class=\"embetty-video\">\n    <div\n      v-if=\"activated\"\n      class=\"wrapper\"\n      :class=\"{ 'default-height': height === null }\"\n      :style=\"height === null ? `` : `height: ${height}px`\"\n      v-html=\"iframe\" />\n    <template v-else>\n      <button type=\"button\" class=\"playbutton\" @click=\"activate\">\n        <svg\n          xmlns=\"http://www.w3.org/2000/svg\"\n          width=\"72\"\n          height=\"72\"\n          viewBox=\"0 0 48 48\"\n          fill=\"#fff\">\n          <path d=\"M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 29V15l12 9-12 9z\" />\n        </svg>\n      </button>\n      <div\n        :class=\"{\n          'poster': true,\n          'default-height': height === null,\n          'contain': posterImageMode === 'contain'\n        }\"\n        :style=\"[\n          posterImageUrl ? { backgroundImage: `url(${posterImageUrl})` } : {},\n          height === null ? {} : { height: `${height}px` }\n      ]\" />\n      <a\n        href=\"https://www.heise.de/embetty\"\n        target=\"_blank\"\n        rel=\"noopener\"\n        class=\"powered-by\"\n        title=\"embetty - displaying remote content without compromising your privacy.\">\n        powered by <span class=\"embetty-logo\" v-html=\"embettyLogo\" />\n      </a>\n    </template>\n  </div>\n</template>\n\n<style lang=\"scss\">\n@import '../assets/element.scss';\n\n.embetty-video {\n  @include host();\n\n  .poster, .wrapper {\n    position: relative;\n    overflow: hidden;\n    background: no-repeat center black;\n    background-size: cover;\n\n    &.contain {\n      background-size: contain;\n    }\n\n    &.default-height {\n      height: 0;\n      padding-top: 56.25%; // percentage values in padding refer to width; creates a 16:9 ratio\n    }\n  }\n\n  .playbutton,\n  .playbutton:active {\n    box-sizing: border-box;\n    display: block;\n    position: absolute;\n    z-index: 1;\n    width: 100%;\n    height: 100%;\n    border: 0;\n    padding: 0;\n    outline: 0;\n    opacity: 0.9;\n    background: none;\n    cursor: pointer;\n    background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8));\n    transition: opacity 150ms;\n\n    &:hover,\n    &:focus {\n      opacity: 1;\n    }\n  }\n\n  .powered-by {\n    @include powered-by();\n\n    -webkit-font-smoothing: antialiased;\n\n    color: #fff;\n    opacity: .6;\n  }\n\n  iframe,\n  video {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n}\n</style>\n\n<script>\nimport EmbettyEmbed from './EmbettyEmbed.vue';\n\nimport { videoImplementations } from './video-impl/index';\n\nexport default {\n  name: 'EmbettyVideo',\n  extends: EmbettyEmbed,\n  props: {\n    width: {\n      type: Number,\n      required: false,\n      default: null\n    },\n    height: {\n      type: Number,\n      required: false,\n      default: null\n    },\n    type: {\n      type: String,\n      required: true,\n      /**\n       * @param {!string} videoType The type of the video.\n       * @returns {!boolean} True if it is a valid type, false otherwise.\n       */\n      validator: function(videoType) {\n        return videoType in videoImplementations;\n      }\n    },\n    videoId: {\n      type: String,\n      required: true,\n      /**\n       * @param {!string} videoId The ID of the video.\n       * @returns {!boolean} True if it seems like a valid video ID, false otherwise.\n       */\n      validator: function(videoId) {\n        return /^[a-zA-Z0-9_-]{6,}$/.test(videoId) || videoId.startsWith('http');\n      }\n    },\n    startAt: {\n      type: [Number, String],\n      required: false,\n      default: 0,\n      /**\n       * @param {!number} startAt The number of seconds to start playback after.\n       * @returns {!boolean} True if it is a non-negative integer, false otherwise.\n       */\n      validator: function(startAt) {\n        if (typeof startAt === 'number') {\n          return startAt % 1 === 0 && startAt >= 0;\n        }\n\n        return /^(?:(?:\\d+h)?\\d+m)?\\d+s?$/.test(startAt);\n      }\n    },\n    posterImageMode: {\n      type: String,\n      required: false,\n      default: null\n    }\n  },\n  /**\n   * @returns {!object} The component's data.\n   */\n  data: function() {\n    return {\n      activated: false\n    };\n  },\n  computed: {\n    /**\n     * @returns {!VideoImpl} The video implementation, based on the video type.\n     * @throws {!Error} If there is no video implementation for the given type.\n     */\n    impl: function() {\n      if (!(this.type in videoImplementations)) {\n        throw new Error('Could not find video implementation for type ' + this.type + '. Please specify a valid video type.');\n      }\n\n      return videoImplementations[this.type];\n    },\n\n    /**\n     * @returns {!string} The embetty-server URL for the video poster image.\n     */\n    posterImageUrl: function() {\n      return this._api(this.impl.getPosterImageApiEndpoint(this.videoId));\n    },\n\n    /**\n     * @returns {!string} The poster image mode.\n     */\n    _posterImageMode: function() {\n      return this.posterImageMode || this._embettyVueOptions.posterImageMode || 'cover';\n    },\n\n    /**\n     * @returns {!number} The number of seconds the video should start at.\n     */\n    _startAt: function() {\n      if (typeof this.startAt === 'number') {\n        return this.startAt;\n      }\n\n      var timeRegex = /^(?:(?:(\\d+)h)?(\\d+)m)?(\\d+)s?$/;\n      var timeMatch = this.startAt.match(timeRegex);\n\n      if (timeMatch) {\n        // '1m16s'    -> timeMatch = ['1m16s',    undefined, '1', '16']\n        // '1h23m45s' -> timeMatch = ['1h23m45s', '1',       '2', '34']\n        var timeNumbers = timeMatch.map(function(val) {\n          if (val === undefined) {\n            return 0;\n          }\n          return parseInt(val);\n        });\n\n        var hours = timeNumbers[1];\n        var minutes = timeNumbers[2];\n        var seconds = timeNumbers[3];\n\n        return (hours * 3600) + (minutes * 60) + seconds;\n      }\n\n      return 0;\n    },\n\n    /**\n     * @override\n     * @returns {?string} The embetty-server URL to fetch video data from, or undefined\n     *                    if this video does not require additional data.\n     */\n    url: function() {\n      return this._api(this.impl.getVideoDataApiEndpoint(this.videoId));\n    },\n\n    /**\n     * @returns {!string} The HTML for the <iframe> this component renders upon activating.\n     */\n    iframe: function() {\n      return this.impl.getIframe({\n        width: this.width || 1600,\n        height: this.height || 900,\n        videoId: this.videoId,\n        startAt: this._startAt,\n        serverData: this.data\n      });\n    }\n  },\n  methods: {\n    /**\n     * Activates the video, i.e. replaces the poster image and play button with the iframe.\n     */\n    activate: function() {\n      this.activated = true;\n      this.$emit('activated');\n    }\n  }\n};\n</script>\n", ".embetty-video {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  max-width: 100%;\n  font-family: var(--embetty-font-family, Helvetica, Roboto, \"Segoe UI\", Calibri, sans-serif);\n  border: 1px solid var(--embetty-border-color, #ccc);\n  border-width: 1px;\n  border-radius: 4px;\n  box-sizing: border-box;\n  font-size: 16px;\n  line-height: 1;\n}\n.embetty-video .poster, .embetty-video .wrapper {\n  position: relative;\n  overflow: hidden;\n  background: no-repeat center black;\n  background-size: cover;\n}\n.embetty-video .poster.contain, .embetty-video .wrapper.contain {\n  background-size: contain;\n}\n.embetty-video .poster.default-height, .embetty-video .wrapper.default-height {\n  height: 0;\n  padding-top: 56.25%;\n}\n.embetty-video .playbutton,\n.embetty-video .playbutton:active {\n  box-sizing: border-box;\n  display: block;\n  position: absolute;\n  z-index: 1;\n  width: 100%;\n  height: 100%;\n  border: 0;\n  padding: 0;\n  outline: 0;\n  opacity: 0.9;\n  background: none;\n  cursor: pointer;\n  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8));\n  transition: opacity 150ms;\n}\n.embetty-video .playbutton:hover, .embetty-video .playbutton:focus,\n.embetty-video .playbutton:active:hover,\n.embetty-video .playbutton:active:focus {\n  opacity: 1;\n}\n.embetty-video .powered-by {\n  position: absolute;\n  z-index: 3;\n  right: -20px;\n  bottom: 0px;\n  padding: 20px 46px 5px 20px;\n  font-size: 14px;\n  color: #777;\n  text-decoration: none;\n  opacity: 0.3;\n  -webkit-font-smoothing: antialiased;\n  color: #fff;\n  opacity: 0.6;\n}\n.embetty-video .powered-by:hover, .embetty-video .powered-by:focus {\n  opacity: 1;\n}\n.embetty-video .powered-by .embetty-logo {\n  position: absolute;\n  right: 0;\n  bottom: -42px;\n  width: 40px;\n}\n.embetty-video iframe,\n.embetty-video video {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n\n/*# sourceMappingURL=EmbettyVideo.vue.map */"]
    },
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$2 = undefined;
/* module identifier */

const __vue_module_identifier__$2 = undefined;
/* functional template */

const __vue_is_functional_template__$2 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$2 = normalizeComponent_1({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, browser, undefined, undefined);

var EmbettyPlugin = {
  /**
   * @param {!VueConstructor} Vue The global Vue object.
   * @param {?EmbettyVueOptions} options Options for embetty-vue.
   */
  install: function (Vue, options) {
    options = options || {};
    Vue.component('EmbettyTweet', __vue_component__$1);
    Vue.component('EmbettyVideo', __vue_component__$2);
    Vue.prototype._embettyVueOptions = options;
  }
};

exports.EmbettyPlugin = EmbettyPlugin;
exports.EmbettyTweet = __vue_component__$1;
exports.EmbettyVideo = __vue_component__$2;
exports.default = EmbettyPlugin;
