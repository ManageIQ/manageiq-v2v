module.exports = {
  env: {
    browser: true,
    'jest/globals': true
  },
  extends: ['airbnb', 'plugin:jest/recommended', 'prettier', 'prettier/react'],
  plugins: ['prettier', 'jest', 'react'],
  rules: {
    'prettier/prettier': [
      'error',
      { singleQuote: true, trailingComma: 'none' }
    ],
    'react/jsx-filename-extension': 'off'
  }
};
