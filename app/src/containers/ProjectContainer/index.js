import React, { Component } from 'react';
import PropTypes from "prop-types";
import injectSheet from "react-jss";
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
import actions from 'src/actions';

class ProjectContainer extends Component {
  state = {
    show: false,
  }

  componentDidMount() {
    this.props.getProject(this.getProjectQuery, this.props.projectId)
  }

  handleToggleStoryForm = () => {this.setState({ show: !this.state.show })}

  getProjectQuery = `
    query GetProject($id: ID!) {
      getProject(id: $id) {
        id
        name
        stories {
          id
          description
          stage
        }
      }
    }
  `

  deleteProjectMutation = `
    mutation DeleteProject($id: ID!) {
      deleteProject(id: $id) {
        id
        name
      }
    }
  `

  createStoryMutation = `
    mutation CreateStory($description: String!, $stage: String, $projectId: ID!) {
      createStory(description: $description, stage: $stage, projectId: $projectId) {
        id
        name
        stories {
          id
          description
          stage
        }
      }
    }
  `

  get projectId() {
    return this.props.projectId;
  }

  render() {
    const project = this.props.project;
    const show = this.state.show;

    return (
      <div>
        {project && project.stories ?
          <div className={this.props.classes.headerProject}>
            <ProjectHeader
              project={project}
              user={this.props.user}
              onClick={() => this.props.deleteProject(this.deleteProjectMutation, this.projectId)}
            />
            <Button onClick={this.handleToggleStoryForm} variant="light">Create Story</Button>
            {show && 
              <Story header="Create Story">
                <StoryForm button="Create" onSubmit={() => this.props.createStory(this.createStoryMutation, this.props.story, this.projectId)}/>
              </Story>
            }
            <StoryContainer project={this.projectId} stories={project.stories}/>
          </div> :
          <h2>There is no such Project</h2>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const selector = formValueSelector('story');
  const story = selector(state, 'description', 'stage')
  const project = state.project.project

  return {
    story,
    project
  }
}

ProjectContainer.propTypes = {
  user: PropTypes.object,
  getStories: PropTypes.func,
  deleteProject: PropTypes.func,
  createStory: PropTypes.func
};

export default compose(connect(mapStateToProps, actions), injectSheet(styles))(ProjectContainer);