import { connect } from 'react-redux'
import { useState, useEffect } from 'react'

import Navigation from 'src/components/Navigation'
import actions from 'src/actions';

function NavigationContainer(props) {
  const getUserQuery = `
    query GetUser($token: String!) {
      getUser(token: $token) {
        id
        email
        projects {
          id
          name
        }
      }
    }
  `

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    props.getUser(getUserQuery, props.token);

    const timer = setTimeout(() => {
      setIsReady(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [props.token])

  return pug`
    Navigation(...props)
  `
}

const mapStateToProps = ({ session, user }) => ({
  token: session.token,
  user: user.user
})

export default connect(mapStateToProps, actions)(NavigationContainer)
