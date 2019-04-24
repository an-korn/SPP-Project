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
    project: null,
    stories: null
  }

  callback = (data) => {
    this.setState({project: null})
  }

  createCallback = (data) => {
    this.props.getStories(this.project_id)
  }

  setProject = (project) => {
    this.setState({project: project})
  }

  setStories = (stories) => {
    this.setState({stories: stories})
  }

  componentWillMount() {
    this.props.subscribeGetProject(this.setProject);
    this.props.subscribeGetStories(this.setStories);
    this.props.subscribeDeleteProject(this.callback);
    this.props.subscribeCreateStory(this.createCallback);
  }

  componentDidMount() {
    this.props.getProject(this.project_id)
    setTimeout(() => {
      this.props.getStories(this.project_id);
    }, 1000)
  }

  handleToggleStoryForm = () => {this.setState({ show: !this.state.show })}

  get project_id() {
    return this.props.project;
  }

  render() {
    const project = this.state.project;
    const show = this.state.show;

    return (
      <div>
        {project && this.state.stories ?
          <div className={this.props.classes.headerProject}>
            <ProjectHeader
              project={project}
              user={this.props.user}
              onClick={() => this.props.deleteProject(this.project_id)}
            />
            <Button onClick={this.handleToggleStoryForm} variant="light">Create Story</Button>
            {show && 
              <Story header="Create Story">
                <StoryForm button="Create" onSubmit={() => this.props.createStory(this.props.story, project)}/>
              </Story>
            }
            <StoryContainer project={project} stories={this.state.stories}/>
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

  return {
    story
  }
}

ProjectContainer.propTypes = {
  project: PropTypes.string,
  user: PropTypes.number,
  getStories: PropTypes.func,
  deleteProject: PropTypes.func,
  createStory: PropTypes.func
};

export default compose(connect(mapStateToProps, actions), injectSheet(styles))(ProjectContainer);