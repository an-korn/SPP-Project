import { connect } from 'react-redux'

import Navigation from 'src/components/Navigation'

function NavigationContainer(props) {
  return pug`
    Navigation(...props)
  `
}

const mapStateToProps = ({ session }) => ({
  token: session.token,
})

export default connect(mapStateToProps)(NavigationContainer)
