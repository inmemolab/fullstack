module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    parser: "@typescript-eslint/parser",
    sourceType: "module"
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    // abbreviation for eslint-config-prettier
    "prettier"
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // Others
    "no-var": "error",
    // "no-var": "warn",
    "prettier/prettier": "error",
    // disable console
    // "no-console": "warn",
    "no-console": "off",
    // disable debugger
    // "no-debugger": "warn",
    "no-debugger": "off",
    // Suppress duplicate case labels
    "no-duplicate-case": "warn",
    // disallow empty statement blocks
    "no-empty": "warn",
    // disallow unnecessary parentheses
    "no-extra-parens": "off",
    // disallow reassignment of function declaration
    "no-func-assign": "warn",
    // disallow unreachable code after return, throw, continue and break statements
    "no-unreachable": "warn",
    // enforce consistent parenthesis style for all control statements
    "curly": "warn",
    // Requires default branch in switch statement
    "default-case": "warn",
    // Force use of dots wherever possible
    "dot-notation": "warn",
    // requires === and !==
    "eqeqeq": "warn",
    // disallow an else block after the return statement in an if statement
    "no-else-return": "warn",
    // disallow empty functions
    "no-empty-function": "warn",
    // Disable unnecessary nested blocks
    "no-lone-blocks": "warn",
    // multiple spaces are not allowed
    "no-multi-spaces": "warn",
    // Do not declare the same variable multiple times
    "no-redeclare": "warn",
    // disallow assignment statement in return statement
    "no-return-assign": "warn",
    // disable unnecessary return await
    "no-return-await": "warn",
    // disable self-assignment
    "no-self-assign": "warn",
    // disable self-comparison
    "no-self-compare": "warn",
    // disallow unnecessary catch clauses
    "no-useless-catch": "warn",
    // Disallow redundant return statements
    "no-useless-return": "warn",
    // Disallow variable declarations with the same name as variables in the outer scope
    "no-shadow": "off",
    // allow delete variables
    "no-delete-var": "off",
    // enforce consistent whitespace in array square brackets
    "array-bracket-spacing": "warn",
    // enforce consistent curly brace style in code blocks
    "brace-style": "warn",
    // enforce camel case naming convention
    "camelcase": "warn",
    // enforce consistent indentation
    "indent": "off",
    // Force consistent use of double or single quotes in JSX attributes
    // 'jsx-quotes': 'warn',
    // enforce a maximum depth of 4 for nestable blocks
    "max-depth": "warn",
    // force max row count to 300
    // "max-lines": ["warn", { "max": 1200 }],
    // Force a maximum of 50 lines of code for a function
    // 'max-lines-per-function': ['warn', { max: 70 }],
    // Force the maximum number of statements allowed in a function block to be 20
    "max-statements": ["warn", 100],
    // Force the maximum nesting depth of callback functions
    "max-nested-callbacks": ["warn", 3],
    // enforce the maximum number of arguments allowed in the function definition
    "max-params": ["warn", 3],
    // enforce the maximum number of statements allowed in each line
    "max-statements-per-line": ["warn", { max: 1 }],
    // require a newline for each call in the method chain
    "newline-per-chained-call": ["warn", { ignoreChainWithDepth: 3 }],
    // disallow if as the only statement in the else statement
    "no-lonely-if": "warn",
    // Disable mixed indentation of spaces and tabs
    "no-mixed-spaces-and-tabs": "warn",
    // multi-line blank lines are prohibited
    "no-multiple-empty-lines": "warn",
    // forbidden to appear;
    // "semi": ["warn", "never"],
    // enforce consistent whitespace before blocks
    "space-before-blocks": "warn",
    // enforce consistent whitespace before function's opening parenthesis
    // 'space-before-function-paren': ['warn', 'never'],
    // enforce consistent whitespace inside parentheses
    "space-in-parens": "warn",
    // requires spaces around the operator
    "space-infix-ops": "warn",
    // enforce consistent whitespace before and after unary operators
    "space-unary-ops": "warn",
    // enforce consistent whitespace in comments // or /*
    // "spaced-comment": "warn",
    // Force spaces around switch colons
    "switch-colon-spacing": "warn",
    // Force arrow functions to use consistent spaces before and after the arrow
    "arrow-spacing": "warn",
    "prefer-const": "warn",
    "prefer-rest-params": "warn",
    "no-useless-escape": "warn",
    "no-irregular-whitespace": "warn",
    "no-prototype-builtins": "warn",
    "no-fallthrough": "warn",
    "no-extra-boolean-cast": "warn",
    "no-case-declarations": "warn",
    "no-async-promise-executor": "warn"
  }
};
