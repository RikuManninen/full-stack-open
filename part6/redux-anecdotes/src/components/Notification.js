
import React from 'react'
import { useSelector } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return notification 
    ? <div style={style}>{notification}</div> 
    : null

}

export const notify = (msg, dispatch) => {
  dispatch(showNotification(msg))
  setTimeout(() => dispatch(showNotification(null)), 5000)
}

export default Notification