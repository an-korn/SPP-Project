import {xhr} from "../helpers/xhr";

export const getProjects = (query, token) => async dispatch => {
  try {
    const data = await xhr.callApi({query, token});
    dispatch({
      type: "SET_PROJECT_DATA",
      projects: data.data.getProjects
    })
  } catch(err) {

  }
}

export const getProject = (query, id) => async dispatch => {
  dispatch({type: "SET_PROJECT"})
  try {
    const variables = {id}
    const data = await xhr.callApi({query, variables});
    dispatch({
      type: "SET_PROJECT_SUCCESS",
      project: data.data.getProject
    })
  } catch(err) {
    dispatch({type: "SET_PROJECT_FAILURE"})
  }
}

export const createProject = (query, userId, body) => async dispatch => {
  dispatch({type: "SET_USER"})
  try {
    const variables = {userId, ...body}
    const data = await xhr.callApi({query, variables});
    dispatch({
      type: "SET_USER_SUCCESS",
      user: data.data.createProject
    })
  } catch(err) {
    dispatch({type: "SET_USER_FAILURE"})
  }
}

export const deleteProject = (query, id) => async dispatch => {
  dispatch({type: "CLEAR_PROJECT_DATA"})
  try {
    const variables = {id}
    const data = await xhr.callApi({query, variables});
    dispatch({
      type: "CLEAR_PROJECT_DATA_SUCCESS",
      project: data.data.updateProject
    })
  } catch(err) {
    dispatch({type: "CLEAR_PROJECT_DATA_FAILURE"})
  }
}

export const updateProject = (query, id, body) => async dispatch => {
  dispatch({type: "SET_PROJECT"})
  try {
    const variables = {...body, id}
    const data = await xhr.callApi({query, variables});
    dispatch({
      type: "SET_PROJECT_SUCCESS",
      project: data.data.updateProject
    })
  } catch(err) {
    dispatch({type: "SET_PROJECT_FAILURE"})
  }
}
