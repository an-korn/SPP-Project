import React, { Component } from 'react';
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { compose } from 'redux';
import { connect } from 'react-redux';

import Dropdown from 'src/components/Dropdown';
import ProjectButton from 'src/components/ProjectButton';

import actions from 'src/actions';
import styles from "./styles";

class ProjectsDropdown extends Component {
  state = {
    show: false
  }

  onToggle = () => {this.setState({ show: !this.state.show })}

  get projects() {
    return this.props.user ? this.props.user.projects : [];
  }

  render() {
    return (
      <span>
        <a href="#projects" onClick={this.onToggle}>Projects</a>
        {this.state.show &&
          <Dropdown items={this.projects}>
            <div className={this.props.classes.createProject}>
              <span>Create new Project</span>
              <ProjectButton user={this.state.user} icon="md-add" />
            </div>
          </Dropdown>
        }
      </span>
    )
  }
}

const mapStateToProps = ({ session, user, project }) => ({
  token: session.token,
  user: user.user
})

ProjectsDropdown.propTypes = {
  classes: PropTypes.object
};

export default compose(connect(mapStateToProps, actions), injectSheet(styles))(ProjectsDropdown);