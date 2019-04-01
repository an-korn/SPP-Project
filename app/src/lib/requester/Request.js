import axios from 'axios'
import _defaultsDeep from 'lodash/defaultsDeep'

const defaultExtractErrorMessage = (response = {}) => response.statusText

const getAuthHeaders = (token) => {
  if (!token) return null

  return {
    Authorization: `Bearer ${token}`,
  }
}

/* eslint-disable no-underscore-dangle, class-methods-use-this */

export default class Request {
  constructor({ extractErrorMessage, ...config } = {}) {
    this.extractErrorMessage = extractErrorMessage || defaultExtractErrorMessage

    this._root = axios.create(config)
  }

  _request(method, url, data) {
    const token = localStorage.getItem('SESSION_TOKEN') || '$$token'

    return this._root.request({
      method,
      url,
      ..._defaultsDeep(data, {
        headers: {
          ...getAuthHeaders(token),
        },
      }),
    })
      .then(response => response.data)
      .catch(({ response }) => {
        const errorMessaage = this.extractErrorMessage(response)
          || 'Request can not be processed right now'

        return Promise.reject(errorMessaage)
      })
  }

  get(url, payload) {
    return this._request('get', url, { params: payload })
  }

  post(url, payload) {
    return this._request('post', url, { data: payload })
  }

  put(url, payload) {
    return this._request('put', url, { data: payload })
  }
}
