module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@tanstack/query'],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};
