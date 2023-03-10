import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { Notifications } from '@mantine/notifications';

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MantineProvider withGlobalStyles withNormalizeCSS>
    <Notifications />
      <App />
    </MantineProvider>
  </BrowserRouter>
);
