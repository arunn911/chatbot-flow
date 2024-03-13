import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { TopbarProvider } from "./context/provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TopbarProvider>
      <App />
    </TopbarProvider>
  </React.StrictMode>
);
