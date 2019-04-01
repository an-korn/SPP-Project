import _ from 'lodash'

import { request } from '../requester'

const methods = ['get', 'post', 'put']

const testOne = (requester) => {
  methods.forEach((methodName) => {
    it(`has .${methodName} method`, () => {
      expect(_.isFunction(requester[methodName])).toBe(true)
    })
  })
}

describe('request', () => testOne(request))
