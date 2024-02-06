import React from "react";
import App from "./App";
import "./index.css";
import { NotificationProvider } from "./Providers";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
      <App tab="home" />
    </NotificationProvider>
  </QueryClientProvider>,
);
