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

import actions from 'src/actions';

class StoryContainer extends Component {
  callback(data, props) {
    props.getStories(props.project.id)
  }

  componentWillMount() {
    this.props.subscribeDeleteStory(this.callback, this.props);
    this.props.subscribeUpdateStory(this.callback, this.props);
  }

  get body() {
    return this.props;
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
                onSubmit={() => this.props.updateStory(this.props.updatedStories, story.id)}
                initialValues={{description: story.description, stage: story.stage, id: story.id}}
              />
              <Button onClick={() => this.props.deleteStory(story.id)} variant="light">Delete</Button>
            </div>
          </Story>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  if (ownProps.stories) {
    const selectors = ownProps.stories.map(story => formValueSelector(`story_${story.id}`));
    const updatedStories = selectors.map(selector => selector(state, 'description', 'stage', 'id'))

    return {
      updatedStories: updatedStories
    }
  } else {
    return {}
  }
}

StoryContainer.propTypes = {
  deleteStory: PropTypes.func,
  updateStory: PropTypes.func
};

export default connect(mapStateToProps, actions)(StoryContainer);