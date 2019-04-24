import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { compose } from 'redux';
import { connect } from 'react-redux';

import ModalLauncher from 'src/components/ModalLauncher';
import styles from './styles';
import actions from 'src/actions';

class Welcome extends React.Component {
  state = {
    user_email: null,
    user_id: null
  }

  setUser = (user) => {
    this.setState({user_email: user.email, user_id: user.id})
  }

  componentWillMount() {
    this.props.subscribeGetUser(this.setUser);
  }

  componentDidMount() {
    this.props.getUser(this.props.token);
  }
 
  render() {
  	return(
  	  <div className="welcome-wrapper">
  	    <div className={this.props.classes.welcomeHeader}><h1>Welcome, {this.state.user_email}!</h1></div>
	      <ModalLauncher user={this.state.user_id}/>
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
