import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import "react-circular-progressbar/dist/styles.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes.jsx";
import { AppContextProvider } from "./contexts/AppContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AppContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
