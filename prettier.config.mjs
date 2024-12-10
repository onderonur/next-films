/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  singleQuote: true,
  trailingComma: 'all',
  endOfLine: 'lf',
  // To skip destructive code actions of `prettier-plugin-organize-imports`,
  // removing unused imports:
  // https://www.npmjs.com/package/prettier-plugin-organize-imports#skip-destructive-code-actions
  organizeImportsSkipDestructiveCodeActions: true,
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-packagejson'],
};

export default config;
