module.exports = {
  root: true,
  env: {
    node: true
  },
  "plugins": [
    "no-es2015"
  ],
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': ["error", { "args": "none" }],
    "semi": "error",
    "no-trailing-spaces": "error",
    "comma-dangle": ["error", "never"],
    "quotes": ["error", "single"],
    "no-template-curly-in-string": "error",
    "vue/max-attributes-per-line": ["error", { "singleline": 3 }],
    "vue/html-closing-bracket-newline": "error",
    "vue/html-closing-bracket-spacing": "error",
    "vue/prop-name-casing": "error",
    "require-jsdoc": ["warn", {
      "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": true,
        "ArrowFunctionExpression": false,
        "FunctionExpression": false
      }
    }],
    "valid-jsdoc": ["error", {
      "requireReturn": false,
      "prefer": {
        "arg": "param",
        "argument": "param",
        "augments": "extends",
        "class": "constructor",
        "const": "constant",
        "defaultvalue": "default",
        "desc": "description",
        "exception": "throws",
        "file": "fileoverview",
        "fires": "emits",
        "func": "function",
        "host": "external",
        "linkcode": "link",
        "linkplain": "link",
        "method": "function",
        "overview": "fileoverview",
        "prop": "property",
        "return": "returns",
        "var": "member",
        "virtual": "abstract",
        "yield": "yields"
      },
      "preferType": {
        "Boolean": "boolean",
        "Number": "number",
        "Object": "object",
        "String": "string"
      }
    }],

    // Don't use ES2015 at all, so we don't need a transpiler like Babel.
    // This reduces the bundle size dramatically.
    "no-es2015/no-object-computed-properties": "error",
    "no-es2015/no-object-shorthand-properties": "error",
    "no-es2015/no-object-shorthand-method": "error",
    "no-es2015/only-var": "error",
    "no-es2015/no-destructuring-assignment": "error",
    "no-es2015/no-destructuring-params": "error",
    "no-es2015/no-class": "error",
    "no-es2015/no-default-params": "error",
    "no-es2015/no-spread-element": "error",
    "no-es2015/no-rest-params": "error",
    "no-es2015/no-generator-function": "error",
    "no-es2015/no-arrow-func": "error",
    "no-es2015/no-for-of": "error",
    "no-es2015/no-template-string": "error",

    // using import is allowed, since webpack gets rid of it automatically
    "no-es2015/no-import": "off"
  }
}
