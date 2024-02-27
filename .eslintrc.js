const prettierConfig = require('./.prettierrc');

module.exports = {
  plugins: [
    'prettier',
    '@typescript-eslint',
    'jsdoc',
    'jest',
    'optimize-regex',
    'promise',
    'security',
    'unicorn',
  ],
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true, // Added node environment to the root
    es6: true,
    jest: true,
  },
  extends: [
    'prettier',
    'plugin:@typescript-eslint/recommended', // Moved TypeScript configuration to root
    'plugin:eslint-comments/recommended',
    'plugin:import/recommended',
    'plugin:jest/recommended',
    'plugin:jsdoc/recommended',
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
    'plugin:security/recommended',
    'plugin:unicorn/recommended',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    camelcase: 2,
    'new-cap': 0,
    semi: [2, 'always'],
  },
  overrides: [
    // For Javascript
    {
      files: ['**/*.js', '**/*.jsx'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'script',
        parser: '@typescript-eslint/parser',
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'comma-dangle': ['error', 'always-multiline'],
        'jsdoc/require-param-description': 'off',
        'jsdoc/require-returns': 'off',
        'jsdoc/require-returns-description': 'off',
        'jsdoc/require-returns-check': 'error',
        'optimize-regex/optimize-regex': 'error',
        'prettier/prettier': ['error', prettierConfig],
        'security/detect-non-literal-require': 'off',
        'security/detect-object-injection': 'off',
        'security/detect-non-literal-fs-filename': 'off',
        'unicorn/filename-case': 'off',
        'unicorn/no-process-exit': 'off',
        'unicorn/prevent-abbreviations': 'off',
        'no-param-reassign': 'off',
        'default-param-last': 'off',
        'no-async-promise-executor': 'off',
      },
    },
    // // For Javascript Testing
    // {
    //     files: [
    //         '*.spec.js',
    //         '*.test.js',
    //         '*.test.integration.js',
    //         'jest.config.js',
    //         'npm-ensure.js',
    //     ],
    //     rules: {
    //         'import/no-extraneous-dependencies': 'off',
    //         'no-console': 'off',
    //         'node/no-extraneous-require': 'off',
    //         'node/no-unpublished-require': 'off',
    //     },
    // },
  ],
  ignorePatterns: ['server/routes/adminRouter.js', 'server/utils/payment.js'],
};
