import React, { Component } from 'react';
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import axios from 'axios';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

import Story from 'src/components/Story';
import StoryForm from 'src/components/StoryForm';

class StoryContainer extends Component {
  get body() {
    return this.props;
  }

  deleteStory = (id) => {
    axios.delete(`http://localhost:3001/api/v1/story/${id}`)
      .then(response => {
        this.props.deleteStory(id);
      })
      .catch(function (error) {
        window.alert(error.response.data.errors);
      });
  }

  updateStory = (id) => {
    const story = this.props.updatedStories.find(story => story.id === id);
    axios.put(`http://localhost:3001/api/v1/story/${id}`, story)
      .then(response => {
        this.props.updateStory(response.data);
      })
      .catch(function (error) {
        window.alert(error.response.data.errors);
      });
  }

  render() {
    return (
      <div>
        {this.props.stories.map(story => 
          <Story key={story.id} header={story.description}>
            <div>
              <StoryForm
                form={`story_${story.id}`}
                button="Update"
                update={true}
                onSubmit={() => this.updateStory(story.id)}
                initialValues={{description: story.description, stage: story.stage, id: story.id}}
              />
              <Button onClick={() => this.deleteStory(story.id)} variant="light">Delete</Button>
            </div>
          </Story>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  deleteStory: (id) => dispatch({ type: 'DELETE_STORY', id: id }),
  updateStory: (story) => dispatch({type: 'UPDATE_STORY', story: story})
})

const mapStateToProps = (state) => {
  const selectors = state.story.stories.map(story => formValueSelector(`story_${story.id}`));
  const updatedStories = selectors.map(selector => selector(state, 'description', 'stage', 'id'))

  return {
    updatedStories: updatedStories,
    stories: state.story.stories
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryContainer);