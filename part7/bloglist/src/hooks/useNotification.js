import { useContext } from "react";
import { NotificationContext } from "../Providers";

const useNotification = () => {
  const { dispatch } = useContext(NotificationContext);

  const showNotification = (obj) => {
    dispatch({ type: "SET_MESSAGE", payload: obj });
    setTimeout(() => dispatch({ type: "CLEAR_MESSAGE" }), 5000);
  };

  return showNotification;
};

export default useNotification;