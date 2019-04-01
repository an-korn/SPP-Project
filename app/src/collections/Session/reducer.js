import * as actions from './actions'

const initialState = {
  token: null,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case actions.setToken.SUCCESS_TYPE:
  case actions.pull.SUCCESS_TYPE:
    return {
      ...state,
      token: payload.token,
    }
  case actions.removeToken.SUCCESS_TYPE:
    return {
      ...state,
      token: null,
    }

  default:
    return state
  }
}
