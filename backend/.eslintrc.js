module.exports = {
  root: true,
  ignorePatterns: [
    "node_modules",
    "dist",
    "coverage",
    ".eslintrc.js",
    "env",
    ".vscode"
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    "no-loops",
    "import-quotes"
  ],
  extends: [
    'eslint:recommended',
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    "no-multiple-empty-lines": "error",
    "no-loops/no-loops": 1,
    'import-quotes/import-quotes': [2, 'single'],
  }
};