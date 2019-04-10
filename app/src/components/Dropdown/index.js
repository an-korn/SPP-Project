import React, { Component } from 'react';
import PropTypes from "prop-types";
import injectSheet from "react-jss";

import DropdownList from 'src/components/DropdownList';

import styles from "./styles";

class Dropdown extends Component {
  render() {
    return (
      <div className={this.props.classes.dropdownContent}>
        <DropdownList items={this.props.items}>
          {this.props.children}
        </DropdownList>
      </div>
    )
  }
}

Dropdown.propTypes = {
  items: PropTypes.array,
  children: PropTypes.node,
  classes: PropTypes.object
};

export default injectSheet(styles)(Dropdown);