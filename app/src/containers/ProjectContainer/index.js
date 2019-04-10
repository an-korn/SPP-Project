import React, { Component } from 'react';
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import axios from 'axios';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

import ProjectHeader from 'src/components/ProjectHeader';
import Story from 'src/components/Story';
import StoryForm from 'src/components/StoryForm';
import StoryContainer from '../StoryContainer';
import styles from './styles';

class ProjectContainer extends Component {
  state = {
    show: false
  }

  componentDidMount() {
    this.getStories();
  }

  deleteProject = () => {
    axios.delete(`http://localhost:3001/api/v1/project/${this.props.project}`)
      .then(response => {
        this.props.deleteProject(this.props.project);
      })
      .catch(function (error) {
        window.alert(error.response.data.errors);
      });
  }

  createStory = () => {
    axios.post(`http://localhost:3001/api/v1/story`, {story: this.props.story, project: this.props.project})
      .then(response => {
        this.props.addStory(response.data);
      })
      .catch(function (error) {
        window.alert(error.response.data.errors);
      });
  }

  getStories = () => {
    axios.get(`http://localhost:3001/api/v1/story?project=${this.props.project}`)
      .then(response => {
        this.props.setStories(response.data);
      })
      .catch(function (error) {
        window.alert(error.response.data.errors);
      });
  }

  handleToggleStoryForm = () => {this.setState({ show: !this.state.show })}

  get project_id() {
    return this.props.project;
  }

  get project() {
    return this.props.projects.find(project => project.id == this.project_id)
  }

  render() {
    const project = this.project;
    const show = this.state.show;

    return (
      <div>
        {project ?
          <div className={this.props.classes.headerProject}>
            <ProjectHeader
              project={this.project}
              user={this.props.user}
              onClick={this.deleteProject}
            />
            <Button onClick={this.handleToggleStoryForm} variant="light">Create Story</Button>
            {show && 
              <Story header="Create Story">
                <StoryForm button="Create" onSubmit={this.createStory}/>
              </Story>
            }
            <StoryContainer />
          </div> :
          <h2>There is no such Project</h2>
        }
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  deleteProject: (id) => dispatch({ type: 'DELETE_PROJECT', id: id }),
  addStory: (story) => dispatch({type: 'ADD_STORY', story: story}),
  setStories: (stories) => dispatch({ type: 'SET_STORY_DATA', stories: stories }),
})

const mapStateToProps = (state) => {
  const selector = formValueSelector('story');
  const story = selector(state, 'description', 'stage')

  return {
    story,
    projects: state.project.projects,
    stories: state.story.stories
  }
}

ProjectContainer.propTypes = {
  project: PropTypes.string,
  user: PropTypes.number
};

export default compose(connect(mapStateToProps, mapDispatchToProps), injectSheet(styles))(ProjectContainer);