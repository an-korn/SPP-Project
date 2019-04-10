import { connect } from 'react-redux';
import './styles.module.scss';

import Welcome from 'src/containers/Welcome'

function HomePage(props) {
  return pug`
    .wrapper
      if props.token
        Welcome
      else
        p You are not signed in. Please, sign in to use our resources to the full. 
  `
}


const mapStateToProps = ({ session }) => ({
  token: session.token
})

export default connect(mapStateToProps)(HomePage)
