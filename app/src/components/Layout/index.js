import Navigation from 'src/containers/Navigation'

import './styles.module.scss'

function Layout(props) {
  return pug`
    .wrapper
      Navigation

      .body
        = props.children
  `
}

export default Layout
