module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  endOfLine: 'lf',
  importOrder: ['^react(.*)', 'mui/(.*)', '<THIRD_PARTY_MODULES>', '@/(.*)', '^[./]'],
  importOrderSeparation: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
};
