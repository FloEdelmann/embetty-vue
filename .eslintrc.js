module.exports = {
  root: true,
  env: {
    node: true
  },
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
        "FunctionExpression": true
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
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
