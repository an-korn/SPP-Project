import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'src/routes'

import { setToken } from 'src/collections/Session/actions'

const Fragment = React.Fragment

function AuthSaveTokenContainer(props) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    props.setToken(props.token)

    const timer = setTimeout(() => {
      setIsReady(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [props.token])

  return pug`
    Fragment
      if props.token
        p Done! You will be redirected to home page in a second

      if isReady
        Redirect(to="HOME")
  `
}

const mapDispatchToProps = {
  setToken: setToken.init,
}

export default connect(null, mapDispatchToProps)(AuthSaveTokenContainer)
