import React from 'react';
import Ionicon from 'react-ionicons';
import PropTypes from "prop-types";

import styles from './styles.scss';

class DeleteButton extends React.Component {
  render() {
  	return(
      <button onClick={this.props.onClick} className={styles.delete_button}>
  	    <Ionicon
  	      icon={this.props.icon}
  	    />
  	  </button>
  	)
  }
}

DeleteButton.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func
};

export default DeleteButton