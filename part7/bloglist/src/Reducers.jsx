const initialNotificationState = { message: null, type: null };

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return { message: action.payload };
    case "CLEAR_MESSAGE":
      return { message: null };
    default:
      return state;
  }
};

export { notificationReducer, initialNotificationState };
