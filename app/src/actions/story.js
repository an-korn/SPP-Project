import {emit, on} from "src/helpers/socket";

export const subscribeGetStories = (cb) => {
  return {
    type: 'socket',
    types: ['SET_STORY_DATA', 'SET_STORY_DATA_SUCCESS', 'SET_STORY_DATA_FAIL'],
    promise: (socket) => socket.on('get_stories', (data) => cb(data)),
  }
}

export function getStories(project) {
  const message = { project };
  return {
    type: 'socket',
    types: ['SET_STORY_DATA', 'SET_STORY_DATA_SUCCESS', 'SET_STORY_DATA_FAIL'],
    promise: (socket) => socket.emit('get_stories', message),
  }
}

export const subscribeCreateStory = (cb) => {
  return {
    type: 'socket',
    types: ['ADD_STORY', 'ADD_STORY_SUCCESS', 'ADD_STORY_FAIL'],
    promise: (socket) => socket.on('add_story', (data) => cb(data)),
  }
}

export function createStory(story, project) {
  const message = { story, project: project.id };
  return {
    type: 'socket',
    types: ['ADD_STORY', 'ADD_STORY_SUCCESS', 'ADD_STORY_FAIL'],
    promise: (socket) => socket.emit('add_story', message),
  }
}

export const subscribeDeleteStory = (cb, props) => {
  return {
    type: 'socket',
    types: ['DELETE_STORY', 'DELETE_STORY_SUCCESS', 'DELETE_STORY_FAIL'],
    promise: (socket) => socket.on('delete_story', (data) => cb(data, props)),
  }
}

export function deleteStory(id) {
  const message = { id };
  return {
    type: 'socket',
    types: ['DELETE_STORY', 'DELETE_STORY_SUCCESS', 'DELETE_STORY_FAIL'],
    promise: (socket) => socket.emit('delete_story', message),
  }
}

export const subscribeUpdateStory = (cb, props) => {
  return {
    type: 'socket',
    types: ['UPDATE_STORY', 'UPDATE_STORY_SUCCESS', 'UPDATE_STORY_FAIL'],
    promise: (socket) => socket.on('update_story', (data) => cb(data, props)),
  }
}

export function updateStory(stories, id) {
  const story = stories.find(story => story.id === id);
  const message = story;
  return {
    type: 'socket',
    types: ['UPDATE_STORY', 'UPDATE_STORY_SUCCESS', 'UPDATE_STORY_FAIL'],
    promise: (socket) => socket.emit('update_story', message),
  }
}
