import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'src/routes'

import { removeToken } from 'src/collections/Session/actions'

const Fragment = React.Fragment

const Logout = (props) => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    props.removeToken()

    const timer = setTimeout(() => {
      setIsReady(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return pug`
    Fragment
      p Done! You will be redirected to home page in a second

      if isReady
        Redirect(to="HOME")
  `
}

const mapDispatchToProps = {
  removeToken: removeToken.init,
}

export default connect(
  null,
  mapDispatchToProps,
)(Logout)
