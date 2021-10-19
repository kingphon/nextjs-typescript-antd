module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended', 'next', 'next/core-web-vitals'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton']
      }
    ],
    '@typescript-eslint/explicit-function-return-type': 0,
    'react-hooks/rules-of-hooks': 0,
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react/jsx-filename-extension': 0,
    'react/destructuring-assignment': 0,
    'no-nested-ternary': 0,
    'array-callback-return': 0,
    'consistent-return': 0,
    'no-param-reassign': 0,
    'lines-between-class-members': 0
  }
}
