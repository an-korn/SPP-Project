import qs from 'query-string'

import AuthSaveToken from 'src/containers/AuthSaveToken'

import ErrorBlock from 'src/components/ErrorBlock'

function AuthCallbackPage(props) {
  const query = qs.parse(props.location.search)

  if (query.error) {
    return pug`
      ErrorBlock(label="Something went wrong")
        = query.error
    `
  }

  return pug`
    AuthSaveToken(token=query.token)
  `
}

export default AuthCallbackPage
