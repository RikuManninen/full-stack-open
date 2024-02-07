import React from "react";
import LoginView from "./views/LoginView";
import BlogView from "./views/BlogView";
import { useAuth } from "./AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersView from "./views/UsersView";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "./components/Header";
import UserView from "./views/UserView";
const App = () => {
  const { user } = useAuth();
  return (
    <>
      {user && <Header />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!user ? <LoginView /> : <BlogView />} />
          <Route path="/users" element={<UsersView />} />
          <Route path="/users/:id" element={<UserView />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
