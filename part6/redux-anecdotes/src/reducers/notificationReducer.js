const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.data
    default: return state
  }
}

export const showNotification = message => {
  return {
    type: 'SHOW',
    data: message
  }
}

export default notificationReducer