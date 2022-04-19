module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  vueIndentScriptAndStyle: true,
  singleQuote: false,
  quoteProps: "consistent",
  bracketSpacing: true,
  trailingComma: "none",
  jsxSingleQuote: false,
  arrowParens: "always",
  insertPragma: false,
  requirePragma: false,
  proseWrap: "never",
  htmlWhitespaceSensitivity: "strict",
  endOfLine: "lf",
  rangeStart: 0,
  overrides: [
    {
      files: "*.vue",
      options: {
        htmlWhitespaceSensitivity: "ignore"
      }
    },
    {
      files: "*.json",
      options: {
        printWidth: 80
      }
    },
    {
      files: "*.html",
      options: {
        parser: "html"
      }
    }
  ]
};
