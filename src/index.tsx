import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const modalRoot = document.getElementById("modal-root");
if (!modalRoot) {
  const div = document.createElement("div");
  div.id = "modal-root";
  document.body.appendChild(div);
}
