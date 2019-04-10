const intitialState = {
  stories: []
};

export default (state = intitialState, action) => {
  switch (action.type) {
    case 'SET_STORY_DATA': {
      const {stories} = action

      return {
        stories: stories
      }
    }
    case 'CLEAR_PROJECT_DATA': {
      return intitialState;
    }
    case 'ADD_STORY': {
      const{story} = action
      const data = [...state.stories, story]

      return {
        stories: data
      };
    }
    case 'UPDATE_STORY': {
      const{story} = action
      const data = state.stories.map(existingStory => {
        if (existingStory.id === story.id) return story;
        return existingStory;
      });

      return {
        stories: data
      };
    }
    case 'DELETE_STORY': {
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