import React from "react";
import App from "./App";
import "./index.css";
import { NotificationProvider } from "./Providers";
import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <NotificationProvider>
    <App tab="home" />
  </NotificationProvider>,
);
