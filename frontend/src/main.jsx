import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import 'react-circular-progressbar/dist/styles.css';
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes.jsx";
import { AppContextProvider } from "./contexts/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppContextProvider>
    <Router>
      <AppRoutes />
    </Router>
  </StrictMode>
);