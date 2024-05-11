module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:prettier/recommended', 'prettier', 'eslint:recommended'],
  plugins: ['@typescript-eslint'],
  env: {
    node: true,
  },
  overrides: [
    {
      files: ['tests/**/*'],
      env: {
        jest: true,
      },
    },
  ],
};
