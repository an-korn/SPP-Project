const intitialState = {
  user: {},
  isFetching: false,
};

export default (state = intitialState, action) => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        isFetching: true
      }
    }
    case 'SET_USER_SUCCESS': {
      const {user} = action

      return {
        user: user,
        isFetching: false
      }
    }
    case 'SET_USER_FAILURE': {
      return{
        ...state,
        isFetching: false
      }
    }
    default:
      return state;
  }
};