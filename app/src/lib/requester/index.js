import Request from './Request'

export const request = new Request({
  baseURL: process.env.REACT_APP_API_URL,
})
