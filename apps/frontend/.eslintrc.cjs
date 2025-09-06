module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  env: { browser: true, es2021: true, node: true },
  settings: { react: { version: 'detect' } },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'antd',
            importNames: ['Button', 'Input', 'Select', 'Checkbox', 'DatePicker', 'Modal'],
            message: 'atoms経由で使用してください（components/atoms/*）。',
          },
        ],
      },
    ],
  },
};

