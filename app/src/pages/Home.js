import { connect } from 'react-redux'

import Welcome from 'src/containers/Welcome'

function HomePage(props) {
  return pug`
    .wrapper
      if !props.token
        Welcome
  `
}


const mapStateToProps = ({ session }) => ({
  token: session.token
})

export default connect(mapStateToProps)(HomePage)
