import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { compose } from 'redux';
import { connect } from 'react-redux';

import ModalLauncher from 'src/components/ModalLauncher';
import styles from './styles';
import actions from 'src/actions';

class Welcome extends React.Component {
  componentWillMount() {
    this.props.getUser(this.getUserQuery, this.props.token);
  }

  get userEmail() {
    return this.props.user ? this.props.user.email : null
  }

  get userId() {
    return this.props.user ? this.props.user.id : null
  }

  getUserQuery = `
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
 
  render() {
  	return(
  	  <div className="welcome-wrapper">
  	    <div className={this.props.classes.welcomeHeader}><h1>Welcome, {this.userEmail}!</h1></div>
	      <ModalLauncher user={this.userId}/>
      </div>
  	)
  }
}

const mapStateToProps = ({ session, user }) => ({
  token: session.token,
  user: user.user
})

Welcome.propTypes = {
  classes: PropTypes.object,
  onGetUser: PropTypes.func,
  emitGetUser: PropTypes.func
};

export default compose(connect(mapStateToProps, actions), injectSheet(styles))(Welcome);
