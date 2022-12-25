import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import App components
import { App } from "./components/app";

const rootElement = document.getElementById("app");
hydrateRoot(
  rootElement,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
