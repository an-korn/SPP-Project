import React, { Component } from 'react';
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import axios from 'axios';

import StyledButton from 'src/components/StyledButton';
import ProjectButton from 'src/components/ProjectButton';
import styles from './styles';

class ProjectHeader extends Component {
  render() {
    const project = this.props.project
    return (
      <div className={this.props.classes.projectHeader}>
        <h1>{project.name}</h1>
        <ProjectButton project={project.id} update={true} user={this.props.user} icon="md-create" />
        <StyledButton onClick={this.props.onClick} icon="md-close" />
      </div> 
    )
  }
}

ProjectHeader.propTypes = {
  project: PropTypes.object,
  user: PropTypes.number,
  onClick: PropTypes.func
};

export default injectSheet(styles)(ProjectHeader);