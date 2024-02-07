import React, { useContext, useEffect } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LoginView from "./views/LoginView";
import BlogView from "./views/BlogView";
import { useAuth } from "./AuthContext";

const App = () => {
  const { user } = useAuth();
  return (
    <>
      {!user ? <LoginView /> : <BlogView />}
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
