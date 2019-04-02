import React from 'react'
import Ionicon from 'react-ionicons'

import styles from './styles.scss'

class DeleteButton extends React.Component {
  render() {
  	return(
      <button onClick={} className={styles.delete_button}>
	    <Ionicon
	      icon="md-close"
	    />
	  </button>
  	)
  }
}

export default DeleteButton