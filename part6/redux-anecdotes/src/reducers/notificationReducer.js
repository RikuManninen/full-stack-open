const notificationReducer = (state = null, action) => {
  return action.data ? action.data : null
}

export const showNotification = message => {
  return {
    type: 'SHOW',
    data: message
  }
}

export default notificationReducer