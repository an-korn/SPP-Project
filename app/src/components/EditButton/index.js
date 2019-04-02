import React from 'react'
import Ionicon from 'react-ionicons'

import styles from './styles.scss'

class EditButton extends React.Component {
  render() {
  	return(
      <button onClick={} className={styles.edit_button}>
	    <Ionicon
	      icon="md-create"
	    />
	  </button>
  	)
  }
}

export default EditButton
