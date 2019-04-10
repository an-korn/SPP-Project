import React, { Component } from 'react';
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { Link } from 'src/routes';

import styles from "./styles";

class DropdownList extends Component {
  render() {
    return (
      <ol>
        {this.props.children}
        {this.props.items.map(item => <li key={item.id}><Link to={`project/${item.id}`}>{item.name}</Link></li>)}
      </ol>
    )
  }
}

DropdownList.propTypes = {
  items: PropTypes.array,
  children: PropTypes.node,
  classes: PropTypes.object
};

export default injectSheet(styles)(DropdownList);