import { request } from 'src/lib/requester'

export const fetch = () => request
  .get('/', {
    param: 'Text',
  })
