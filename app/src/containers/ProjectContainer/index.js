import React, { Component } from 'react';
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import axios from 'axios';
import { connect } from 'react-redux';

import ProjectHeader from 'src/components/ProjectHeader';

class ProjectContainer extends Component {
  deleteProject = () => {
    axios.delete(`http://localhost:3001/api/v1/project/${this.props.project}`)
      .then(response => {
        this.props.deleteProject(this.props.project);
      })
      .catch(function (error) {
        window.alert(error.response.data.errors);
      });
  }

  get project_id() {
    return this.props.project;
  }

  get project() {
    return this.props.projects.find(project => project.id == this.project_id)
  }

  render() {
    return (
      <ProjectHeader
        project={this.project}
        user={this.props.user}
        onClick={this.deleteProject}
      />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  deleteProject: (id) => dispatch({ type: 'DELETE_PROJECT', id: id }),
  addStory: (story) => dispatch({type: 'ADD_STORY', story: story})
})

const mapStateToProps = ({ project, story }) => ({
  projects: project.projects,
  stories: story.stories
})

ProjectContainer.propTypes = {
  project: PropTypes.string,
  user: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer);