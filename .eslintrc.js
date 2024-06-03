const prettierConfig = require('./.prettierrc.js');

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['**/*.js', '**/*.jsx'],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['prettier', 'jsdoc', 'jest', 'optimize-regex', 'promise', 'security', 'unicorn'],
  rules: {
    camelcase: 2,
    'new-cap': 0,
    semi: [2, 'always'],
    'prettier/prettier': ['error', prettierConfig], // Use prettierConfig
    'optimize-regex/optimize-regex': 'error',
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
  ignorePatterns: [
    'server/routes/adminRouter.js',
    'server/utils/payment.js',
    'server/cronjob',
    'server/locust',
  ],
};
