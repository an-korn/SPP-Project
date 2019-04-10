import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { compose } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import ModalLauncher from 'src/components/ModalLauncher';
import styles from './styles';

class Welcome extends React.Component {
  state = {
    user_email: null,
    user_id: null
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    axios.get(`http://localhost:3001/api/v1/user?token=${this.props.token}`)
      .then(response => {
        this.setState({user_email: response.data.email, user_id: response.data.id})
      })
      .catch(function (error) {
        window.alert(error.response.data.errors);
      });
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

const mapStateToProps = ({ session }) => ({
  token: session.token
})

Welcome.propTypes = {
  classes: PropTypes.object
};

export default compose(connect(mapStateToProps), injectSheet(styles))(Welcome);
