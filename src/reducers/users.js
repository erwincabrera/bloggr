const initialState = {
  currentUser: null,
  allUsers: []
}

export const users = (state = initialState, action) => {
  switch (action.type) {
  case 'INITIALIZE_USERS':
    return {
      ...state,
      allUsers: action.payload.users
    }
  case 'SET_USER':
    return {
      ...state,
      currentUser: action.payload.user
    }
  default:
    return state
  }
}
