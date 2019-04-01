// eslint-disable-next-line import/no-extraneous-dependencies
const babelJest = require('babel-jest')

module.exports = babelJest.createTransformer({
  babelrc: true,
  configFile: true,
})
