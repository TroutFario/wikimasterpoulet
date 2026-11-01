import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./styles/base.css";
import "./styles/stats.css";
import "./styles/actor.css";
import "./styles/details.css";
import "./styles/comparaison.css";
import "./styles/graph.css";
import "./styles/toolbar.css";
import "./styles/responsive.css";
import "./styles/accessibility.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
