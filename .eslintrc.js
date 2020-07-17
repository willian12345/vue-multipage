module.exports = {
  useEslint: false,
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 'off',
    'no-irregular-whitespace': 'off',
    'no-console': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
