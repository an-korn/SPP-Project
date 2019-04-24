import {emit, on} from "src/helpers/socket";

export const subscribeGetProjects = (cb) => {
  return {
    type: 'socket',
    types: ['SET_PROJECT_DATA', 'SET_PROJECT_DATA_SUCCESS', 'SET_PROJECT_DATA_FAIL'],
    promise: (socket) => socket.on('get_projects', (data) => cb(data)),
  }
}

export function getProjects(user) {
  const message = { user };
  return {
    type: 'socket',
    types: ['SET_PROJECT_DATA', 'SET_PROJECT_DATA_SUCCESS', 'SET_PROJECT_DATA_FAIL'],
    promise: (socket) => socket.emit('get_projects', message),
  }
}

export const subscribeGetProject = (cb) => {
  return {
    type: 'socket',
    types: ['SET_PROJECT_DATA', 'SET_PROJECT_DATA_SUCCESS', 'SET_PROJECT_DATA_FAIL'],
    promise: (socket) => socket.on('get_project', (data) => cb(data)),
  }
}

export function getProject(id) {
  const message = { id };
  return {
    type: 'socket',
    types: ['SET_PROJECT_DATA', 'SET_PROJECT_DATA_SUCCESS', 'SET_PROJECT_DATA_FAIL'],
    promise: (socket) => socket.emit('get_project', message),
  }
}

export const subscribeСreateProject = (cb, props) => {
  return {
    type: 'socket',
    types: ['ADD_PROJECT', 'ADD_PROJECT_SUCCESS', 'ADD_PROJECT_FAIL'],
    promise: (socket) => socket.on('add_project', (data) => cb(data, props)),
  }
}

export function createProject(body) {
  const message = body;
  return {
    type: 'socket',
    types: ['ADD_PROJECT', 'ADD_PROJECT_SUCCESS', 'ADD_PROJECT_FAIL'],
    promise: (socket) => socket.emit('add_project', message),
  }
}

export const subscribeDeleteProject = (cb) => {
  return {
    type: 'socket',
    types: ['DELETE_PROJECT', 'DELETE_PROJECT_SUCCESS', 'DELETE_PROJECT_FAIL'],
    promise: (socket) => socket.on('delete_project', (data) => cb(data)),
  }
}

export function deleteProject(project) {
  const message = { id: project };
  return {
    type: 'socket',
    types: ['DELETE_PROJECT', 'DELETE_PROJECT_SUCCESS', 'DELETE_PROJECT_FAIL'],
    promise: (socket) => socket.emit('delete_project', message),
  }
}

export const subscribeUpdateProject = (cb, props) => {
  return {
    type: 'socket',
    types: ['DELETE_PROJECT', 'DELETE_PROJECT_SUCCESS', 'DELETE_PROJECT_FAIL'],
    promise: (socket) => socket.on('update_project', (data) => cb(data, props)),
  }
}

export function updateProject(id, body) {
  const message = { id, name: body.project };
  return {
    type: 'socket',
    types: ['UPDATE_PROJECT', 'UPDATE_PROJECT_SUCCESS', 'UPDATE_PROJECT_FAIL'],
    promise: (socket) => socket.emit('update_project', message),
  }
}
