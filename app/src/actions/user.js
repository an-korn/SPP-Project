import {xhr} from "../helpers/xhr";

export const getUser = (query, token) => async dispatch => {
  dispatch({type: "SET_USER"})
  try {
  	const variables = {token}
    const data = await xhr.callApi({query, variables});
    dispatch({
      type: "SET_USER_SUCCESS",
      user: data.data.getUser
    })
  } catch(err) {
    dispatch({
      type: "SET_USER_FAILURE"
    })
  }
}
