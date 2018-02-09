module.exports = {
  env: {
    browser: true,
    'jest/globals': true
  },
  globals: {
    __: true
  },
  extends: [
    'standard',
    'standard-react',
    'standard-jsx',
    'airbnb',
    'plugin:jest/recommended',
    'prettier',
    'prettier/react'
  ],
  plugins: ['prettier', 'jest', 'react'],
  rules: {
    'prettier/prettier': [
      'error',
      { singleQuote: true, trailingComma: 'none' }
    ],
    'react/jsx-filename-extension': 'off',
    'react/prefer-stateless-function': 'warn',
    'react/forbid-prop-types': 'off',
    'react/require-default-props': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'no-return-assign': 'off',
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none'
      }
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        // Allow importing devDependencies like @storybook
        devDependencies: true
      }
    ]
  },
  parser: 'babel-eslint'
};
