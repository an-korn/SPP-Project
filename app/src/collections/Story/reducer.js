const intitialState = {
  stories: []
};

export default (state = intitialState, action) => {
  switch (action.type) {
    case 'SET_STORY_DATA', 'SET_STORY_DATA_SUCCESS': {
      const {stories} = action

      return {
        stories: stories
      }
    }
    case 'ADD_STORY', 'ADD_STORY_SUCCESS': {
      const{story} = action
      const data = [...state.stories, story]

      return {
        stories: data
      };
    }
    case 'UPDATE_STORY', 'UPDATE_STORY_SUCCESS': {
      const{story} = action
      const data = state.stories.map(existingStory => {
        if (existingStory.id === story.id) return story;
        return existingStory;
      });

      return {
        stories: data
      };
    }
    case 'DELETE_STORY', 'DELETE_STORY_SUCCESS': {
      const{id} = action;
      const data = state.stories.filter(story => story.id != id);

      return {
        stories: data
      };
    }
    default:
      return state;
  }
};