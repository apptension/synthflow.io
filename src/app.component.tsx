import React from "react";
import { Layout } from "./components/layout";
import { AppSettingsProvider, TransportProvider } from "./providers";
import { GlobalStyle } from "./theme";

const App = () => {
	return (
		<>
			<GlobalStyle />
			<AppSettingsProvider.Provider>
				<TransportProvider.Provider>
					<Layout />
				</TransportProvider.Provider>
			</AppSettingsProvider.Provider>
		</>
	);
}

export default App;
