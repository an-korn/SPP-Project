import React, { Component } from 'react';
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import axios from 'axios';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Dropdown from 'src/components/Dropdown';
import ProjectButton from 'src/components/ProjectButton';

import styles from "./styles";

class ProjectsDropdown extends Component {
  state = {
    show: false,
    user: null
  }

  componentDidMount() {
    this.getUser();
    setTimeout(() => {
      this.getProjects();
    }, 1000)
    setTimeout(() => {
      this.getStories();
    }, 500)
  }

  getUser = () => {
    axios.get(`http://localhost:3001/api/v1/user?token=${this.props.token}`)
      .then(response => {
        this.setState({user: response.data.id})
      })
      .catch(function (error) {
        window.alert(error.response.data.errors);
      });
  }

  getProjects = () => {
    axios.get(`http://localhost:3001/api/v1/project?user=${this.state.user}`)
      .then(response => {
        this.props.setProjects(response.data);
      })
      .catch(function (error) {
        window.alert(error.response.data.errors);
      });
  }

  getStories = () => {
    axios.get(`http://localhost:3001/api/v1/story?user=${this.state.user}`)
      .then(response => {
        this.props.setStories(response.data);
      })
      .catch(function (error) {
        window.alert(error.response.data.errors);
      });
  }

  onToggle = () => {this.setState({ show: !this.state.show })}

  render() {
    return (
      <span>
        <a href="#projects" onClick={this.onToggle}>Projects</a>
        {this.state.show &&
          <Dropdown items={this.props.projects}>
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

const mapDispatchToProps = dispatch => ({
  setProjects: (projects) => dispatch({ type: 'SET_PROJECT_DATA', projects: projects }),
  setStories: (stories) => dispatch({ type: 'SET_STORY_DATA', stories: stories }),
})

const mapStateToProps = ({ session, project }) => ({
  token: session.token,
  projects: project.projects
})

ProjectsDropdown.propTypes = {
  classes: PropTypes.object
};

export default compose(connect(mapStateToProps, mapDispatchToProps), injectSheet(styles))(ProjectsDropdown);