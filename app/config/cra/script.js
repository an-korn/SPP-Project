/* eslint-disable global-require, no-console, import/no-extraneous-dependencies */

require('module-alias/register')

const jest = require('jest')

const argv = process.argv.slice(2)
const scriptName = argv[0]

switch (scriptName) {
case 'start':
  require('react-scripts/scripts/start')
  break

case 'build':
  require('react-scripts/scripts/build')
  break

case 'test':
  // Do this as the first thing so that any code reading it knows the right env.
  process.env.BABEL_ENV = 'test'
  process.env.NODE_ENV = 'test'
  process.env.PUBLIC_URL = ''

  require('react-scripts/config/env')

  // Remove script name ("test")
  argv.shift()

  argv.push('--env=jsdom')
  argv.push('--colors')

  if (!process.env.CI && argv.indexOf('--coverage') < 0) {
    argv.push('--watch')
  }

  jest.run(argv)

  break

default:
  console.log(`
    There is no defined script for "${scriptName}"
  `)
}
