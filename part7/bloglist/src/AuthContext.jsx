import React, { useState, useContext, useReducer } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";

const AuthContext = React.createContext();

const initialState = {
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState, () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      return { user };
    }
    return initialState;
  });

  const login = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch({ type: "LOGIN", payload: user });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
