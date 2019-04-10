import React, { Component } from 'react';
import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.css';


class Story extends Component {
  render () {
    return (
      <Card>
        <Card.Header as="h4">{this.props.header}</Card.Header>
        <Card.Body>
          {this.props.children}
        </Card.Body>
      </Card>
    );
  }
}

Story.propTypes = {
  header: PropTypes.string,
  children: PropTypes.node
};

export default Story;