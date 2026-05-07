import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element #root not found");
const tree = (
	<StrictMode>
		<App />
	</StrictMode>
);

if (rootEl.hasChildNodes()) {
	hydrateRoot(rootEl, tree);
} else {
	createRoot(rootEl).render(tree);
}
