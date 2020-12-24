export const notification = (state = null, action) => {
  switch (action.type) {
  case 'NEW_NOTIFICATION':
    return action.payload.text
  case 'CLEAR_NOTIFICATIONS':
    return null
  default:
    return state
  }
}