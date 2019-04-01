import * as actions from './actions'

const initialState = {
  status: '',
}

export default (state = initialState, { type }) => {
  switch (type) {
  case actions.fetch.INIT_TYPE:
    return {
      ...state,
      status: 'Initiated',
    }

  case actions.fetch.SUCCESS_TYPE:
    return {
      ...state,
      status: 'Succeed',
    }

  case actions.fetch.FAILURE_TYPE:
    return {
      ...state,
      status: 'Failed',
    }

  default:
    return state
  }
}
