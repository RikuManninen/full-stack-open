import React from "react";
import App from "./App";
import "./index.css";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationProvider } from "./Providers";
import { AuthProvider } from "./AuthContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const queryClient = new QueryClient();
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
          <NotificationProvider>
            <App />
          </NotificationProvider>
      </QueryClientProvider>
    </AuthProvider>
  </>,
);
