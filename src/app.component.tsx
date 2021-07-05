import React from "react";
import { Layout } from "./components/layout";
import { AppSettingsProvider, TransportProvider } from "./providers";
import { GlobalStyle } from "./theme";
import { BrowserRouter as Router } from "react-router-dom"

const App = () => {
	return (
		<Router>
			<GlobalStyle />
			<AppSettingsProvider.Provider>
				<TransportProvider.Provider>
					<Layout />
				</TransportProvider.Provider>
			</AppSettingsProvider.Provider>
		</Router>
	);
}

export default App;
