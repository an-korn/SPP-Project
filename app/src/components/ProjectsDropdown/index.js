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
    show: false,
    user: null,
    projects: null
  }

  setUser = (user) => {
    this.setState({user: user.id})
  }

  setProjects = (projects) => {
    this.setState({projects: projects})
  }

  componentWillMount() {
    this.props.subscribeGetUser(this.setUser);
    this.props.subscribeGetProjects(this.setProjects);
  }

  componentDidMount() {
    this.props.getUser(this.props.token);
    setTimeout(() => {
      this.props.getProjects(this.state.user);
    }, 1000)
  }

  onToggle = () => {this.setState({ show: !this.state.show })}

  render() {
    return (
      <span>
        <a href="#projects" onClick={this.onToggle}>Projects</a>
        {this.state.show &&
          <Dropdown items={this.state.projects}>
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

const mapStateToProps = ({ session, project }) => ({
  token: session.token,
  projects: project.projects
})

ProjectsDropdown.propTypes = {
  classes: PropTypes.object
};

export default compose(connect(mapStateToProps, actions), injectSheet(styles))(ProjectsDropdown);