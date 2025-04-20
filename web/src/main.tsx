import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { VisibilityProvider } from "./Providers/VisibilityProvider";
import { App } from "./Components/App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VisibilityProvider component="App">
      <App />
    </VisibilityProvider>
  </StrictMode>
);
