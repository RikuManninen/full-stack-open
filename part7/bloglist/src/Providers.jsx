import { createContext, useReducer } from "react";
import { notificationReducer, initialNotificationState } from "./Reducers";
const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    notificationReducer,
    initialNotificationState,
  );
  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext };
