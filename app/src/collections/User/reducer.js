const intitialState = {
  user: {}
};

export default (state = intitialState, action) => {
  switch (action.type) {
    case 'SET_USER', 'SET_USER_SUCCESS': {
      const {user} = action

      return {
        user: user
      }
    }
    default:
      return state;
  }
};