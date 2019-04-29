import {xhr} from "../helpers/xhr";

export const getStories = (query, token) => async dispatch => {
  try {
    const data = await xhr.callApi({query, token});
    dispatch({
      type: "SET_STORY_DATA",
      stories: data.data.getStories
    })
  } catch(err) {

  }
}

export const createStory = (query, body, projectId) => async dispatch => {
  dispatch({type: "SET_PROJECT"})
  try {
    const variables = {...body, projectId}
    const data = await xhr.callApi({query, variables});
    dispatch({
      type: "SET_PROJECT_SUCCESS",
      project: data.data.createStory
    })
  } catch(err) {
    dispatch({type: "SET_PROJECT_FAILURE"})
  }
}

export const deleteStory = (query, id) => async dispatch => {
  dispatch({type: "SET_PROJECT"})
  try {
    const variables = {id}
    const data = await xhr.callApi({query, variables});
    dispatch({
      type: "SET_PROJECT_SUCCESS",
      project: data.data.deleteStory
    })
  } catch(err) {
    dispatch({type: "SET_PROJECT_FAILURE"})
  }
}

export const updateStory = (query, stories, id) => async dispatch => {
  const story = stories.find(story => story.id === id);
  dispatch({type: "SET_PROJECT"})
  try {
    const variables = story
    const data = await xhr.callApi({query, variables});
    dispatch({
      type: "SET_PROJECT_SUCCESS",
      project: data.data.updateStory
    })
  } catch(err) {
    dispatch({type: "SET_PROJECT_FAILURE"})
  }
}
