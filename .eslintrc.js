module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: ['prettier'],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
            parserOptions: {
                sourceType: 'script',
                parser: '@typescript-eslint/parser',
            },
            extends: [
                'plugin:@typescript-eslint/recommended',
            ],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    plugins: ['prettier'],
    rules: {
        "camelcase": 2,
        'new-cap': 0,
        semi: [2, 'always'],
    },
    ignorePatterns: ['server/routes/adminRouter.js'],
};