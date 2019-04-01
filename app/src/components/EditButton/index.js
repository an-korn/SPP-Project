import React from 'react'
import Ionicon from 'react-ionicons'
import axios from 'axios'
import { connect } from 'react-redux'

import styles from './styles.scss'

class EditButton extends React.Component {
  onLoad = () => {
    this.props.loadOrganization(this.props.props.id);
  }
  render() {
  	return(
      <button onClick={this.onLoad} className={styles.edit_button}>
	    <Ionicon
	      icon="md-create"
	    />
	  </button>
  	)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadOrganization: id => {
      dispatch({
        type: 'LOAD',
        id: id
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(EditButton)
