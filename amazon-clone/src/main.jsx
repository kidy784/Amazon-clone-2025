import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DataProvider } from "./Components/Dataprovider/Dataprovider.jsx";
import { reducer, initialState } from "./Components/utility/reducer.js";
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<DataProvider reducer={reducer} initialState={initialState}>
			<App />
		</DataProvider>
	</StrictMode>
);
