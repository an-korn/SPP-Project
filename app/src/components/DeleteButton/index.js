import React from 'react'
import Ionicon from 'react-ionicons'
import axios from 'axios'
import { connect } from 'react-redux'

import styles from './styles.scss'

class DeleteButton extends React.Component {
  get path() {
    return this.props.props.membership ? 'user' : 'organization'
  }

  onDelete = () => {
	axios.delete(`${process.env.REACT_APP_API_URL}/${this.path}/${this.props.props.id}`)
	  .then(response => {
	    this.path === 'user' ? this.props.deleteUser(this.props.props.id) : this.props.deleteOrganization(this.props.props.id);
	  })
	  .catch(function (error) {
	    window.alert(error.response.data.errors);
	  });
  }

  render() {
  	return(
      <button onClick={this.onDelete} className={styles.delete_button}>
	    <Ionicon
	      icon="md-close"
	    />
	  </button>
  	)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteOrganization: id => {
      dispatch({
        type: 'DELETE_ORGANIZATION',
        id: id
      })
    },
    deleteUser: id => {
      dispatch({
        type: 'DELETE_USER',
        id: id
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(DeleteButton)