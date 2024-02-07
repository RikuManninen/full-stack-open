import { createContext, useReducer } from "react";
import { notificationReducer, initialNotificationState } from "./Reducers";
import Notification from "./components/Notification";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    notificationReducer,
    initialNotificationState,
  );

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      <Notification message={state.message} type={state.type} />
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext };
