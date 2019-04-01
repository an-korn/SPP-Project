import _ from 'lodash'
import Request from '../requester/Request'

const methods = [{
  name: 'get',
  payloadKey: 'params',
}, {
  name: 'post',
  payloadKey: 'data',
}, {
  name: 'put',
  payloadKey: 'data',
}]

const URL_FAILED = 'FAILED'

jest.mock('axios', () => ({
  create: (global = {}) => ({
    _mocked: true,
    request: (local = {}) => {
      if (local.url === 'FAILED') {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({
          response: {
            data: {
              error: '$$data.error',
            },
            statusText: '$$statusText',
          },
        })
      }

      return Promise.resolve({
        data: {
          _mocked: true,
          global,
          local,
        },
      })
    },
  }),
}))

const buildResult = (local = {}) => ({
  _mocked: true,
  local,
})

const buildRoot = (global = {}) => ({
  _mocked: true,
  global,
})

it('can create instances', () => {
  expect(new Request()).toBeTruthy()
})

it('passes baseUrl', async () => {
  const baseUrl = '$$baseUrl'
  const req = new Request({
    baseUrl,
  })

  expect(await req.get()).toMatchObject(buildRoot({
    baseUrl,
  }))
})

it('passes headers', async () => {
  const headers = { 'Api-Key': '$$apiKey' }
  const req = new Request({
    headers,
  })

  expect(await req.get()).toMatchObject(buildRoot({
    headers,
  }))
})

describe('when extractErrorMessage passed', () => {
  it('responds custom message', async () => {
    const req = new Request({
      extractErrorMessage: response => response.data.error,
    })

    const result = await req.get(URL_FAILED).catch(message => message)

    expect(result).toBe('$$data.error')
  })

  it('responds default message if custom is empty', async () => {
    const req = new Request({
      extractErrorMessage: response => response.nothing,
    })

    const result = await req.get(URL_FAILED).catch(message => message)

    expect(result).toBe('Request can not be processed right now')
  })
})

methods.forEach((method) => {
  describe(`when .${method.name} method`, () => {
    let methodReq

    beforeEach(() => {
      const req = new Request()
      methodReq = req[method.name].bind(req)
    })

    it('exists', () => {
      expect(_.isFunction(methodReq)).toBe(true)
    })

    it('makes a plain request', async () => {
      const url = '$$url'
      const result = await methodReq(url)

      expect(result).toMatchObject(buildResult({
        method: method.name,
        url,
      }))
    })

    it('makes a request with payload', async () => {
      const url = '$$url'
      const payload = { one: 1, two: 'second' }
      const result = await methodReq(url, payload)

      expect(result).toMatchObject(buildResult({
        [method.payloadKey]: payload,
      }))
    })

    it('returns statusText if failed', async () => {
      const result = await methodReq(URL_FAILED).catch(message => message)

      expect(result).toBe('$$statusText')
    })

    it('adds Authorization header', async () => {
      const result = await methodReq('any')

      expect(result).toMatchObject(buildResult({
        headers: {
          Authorization: 'Bearer $$token',
        },
      }))
    })
  })
})
