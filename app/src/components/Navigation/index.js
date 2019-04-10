import { Link, LinkExternal } from 'src/routes'
import ProjectsDropdown from 'src/components/ProjectsDropdown'

import './styles.module.scss'

function Navigation(props) {
  return pug`
    .wrapper
      Link(to="HOME") Home

      if !props.token
        LinkExternal(to="AUTH_LOGIN") Login

      else
        Link(to="AUTH_LOGOUT") Logout
        ProjectsDropdown
  `
}

export default Navigation
