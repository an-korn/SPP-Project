import React, { Component } from 'react';
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import isNil from "lodash/fp/isNil";

import styles from "./styles";

class ModalForm extends Component {
  constructor(props) {
    super(props);

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }
  
  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp, false);
    document.addEventListener('click', this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp, false);
    document.removeEventListener('click', this.handleOutsideClick, false);
  }
  
  handleKeyUp(e) {
    const { onClose } = this.props;
    const keys = {
      27: () => {
        e.preventDefault();
        onClose();
        window.removeEventListener('keyup', this.handleKeyUp, false);
      },
    };

    if (keys[e.keyCode]) { keys[e.keyCode](); }
  }
  
  handleOutsideClick(e) {
    const { onClose } = this.props;

    if (!isNil(this.modal)) {
      if (!this.modal.contains(e.target)) {
        onClose();
        document.removeEventListener('click', this.handleOutsideClick, false);
      }
    }
  }
  
  render () {
    const {
      onClose,
      children,
      classes
    } = this.props;
    
    return (
      <div className={classes.modalOverlay}>
        <div
          className={classes.modal}
          ref={node => (this.modal = node)}
        >
          <div className={classes.contentModal}>
            {children}
          </div>
        </div>

        <button
          type="button"
          className={classes.closeButton}
          onClick={onClose}
        />
      </div>
    );
  }
}

ModalForm.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  classes: PropTypes.object
};

export default injectSheet(styles)(ModalForm);