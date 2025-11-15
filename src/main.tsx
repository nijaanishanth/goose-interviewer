import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CVIProvider } from "@/components/cvi/components/cvi-provider";

createRoot(document.getElementById("root")!).render(
	<CVIProvider>
		<App />
	</CVIProvider>
);
