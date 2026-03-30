import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { loadRuntimeConfig } from "./lib/config";

async function initializeApp() {
  try {
    await loadRuntimeConfig();
    console.log("Configurazione caricata correttamente");
  } catch (error) {
    console.warn("Impossibile caricare la configurazione runtime, uso dei valori predefiniti:", error);
  }

  createRoot(document.getElementById("root")!).render(<App />);
}

initializeApp();
