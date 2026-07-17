import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const enableMSW =
  import.meta.env.DEV ||
  import.meta.env.VITE_ENABLE_MSW === "true";

if (enableMSW) {
  const { worker } = await import("./mocks/browser");

  await worker.start({
    onUnhandledRequest: "bypass",
  });
}

createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
