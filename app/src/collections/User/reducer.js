const initialState = {
  user: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
  case "LOAD_USER":
    const loaded_id = action.id;
    const loaded_user = state.users.find(user => user.id === loaded_id)

    return {
      ...state,
      user: loaded_user
    }
  default:
    return state
  }
}
