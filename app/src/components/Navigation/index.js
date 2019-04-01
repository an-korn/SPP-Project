import { Link, LinkExternal } from 'src/routes'

import './styles.module.scss'

function Navigation(props) {
  return pug`
    .wrapper
      Link(to="HOME") Home

      if !props.token
        LinkExternal(to="AUTH_LOGIN") Login

      else
        Link(to="AUTH_LOGOUT") Logout
  `
}

export default Navigation
