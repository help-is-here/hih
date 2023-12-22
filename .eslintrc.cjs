module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'prettier/prettier': 'error',
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'react-refresh/only-export-components': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'interface',
                format: ['PascalCase'],
                prefix: ['I'],
            },
            {
                selector: ['typeAlias'],
                format: ['PascalCase'],
                prefix: ['T'],
            },
            {
                selector: ['enum'],
                format: ['PascalCase'],
                prefix: ['E'],
            },
        ],
        '@typescript-eslint/prefer-ts-expect-error': 'warn',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/ban-ts-comment': [
            'warn',
            {
                'ts-expect-error': 'allow-with-description',
            },
        ],
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        curly: 'error',
        'no-console': ['error', { allow: ['error', 'warn'] }],
        eqeqeq: 2,
    },
}
