const generalConfig = require('react-scripts/config/webpack.config.dev')

// Turn on .babelrc
generalConfig.module.rules[2].oneOf[1].options.babelrc = true

// Remove eslint before building
generalConfig.module.rules.splice(1, 1)

module.exports = generalConfig
