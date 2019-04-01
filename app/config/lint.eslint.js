module.exports = {
  plugins: [
    'react-pug',
  ],

  extends: [
    'datarockets',
    'plugin:react-pug/all',
  ],

  globals: {
    React: true,
  },

  rules: {
    'no-param-reassign': 'off',

    // Turned off because we want different style-guide
    'prefer-destructuring': 'off',
    'react/forbid-prop-types': 'off',

    // Turned off because work inappropriately
    'react/no-this-in-sfc': 'off',

    // Turned off temporary because of pugjs
    'react/prop-types': 'off',
    'react/no-unused-prop-types': 'off',
    'react/no-unused-state': 'off',
  },

  settings: {
    'import/resolver': {
      'babel-module': {
        alias: {
          src: './src',
        },
      },
    },
  },
}
