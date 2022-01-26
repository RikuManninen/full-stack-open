const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.data
    default: return state
  }
}

export const setNotification = (msg, time) => {
  return async dispatch => {
    dispatch({type: 'NOTIFY', data: msg})
    setTimeout(() => dispatch({type: 'NOTIFY', data: null}), time)
  }
}

export default notificationReducer