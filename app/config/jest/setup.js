/* eslint-disable import/no-extraneous-dependencies */

import { configure } from 'enzyme'

import Adapter from 'enzyme-adapter-react-16'

import 'jest-enzyme'

jest.mock('react-redux', () => ({
  connect: () => component => component,
}))

// eslint-disable-next-line no-console
const error = console.error

// eslint-disable-next-line no-console
console.error = (warning, ...args) => {
  if (/(Invalid prop|Failed prop type)/gi.test(warning)) {
    throw new Error(warning)
  }

  error.apply(console, [warning, ...args])
}

configure({
  adapter: new Adapter(),
})
