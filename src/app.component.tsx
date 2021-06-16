import React from "react";
import { Layout } from "./components/layout";
import { AppSettingsProvider } from "./providers";
import { GlobalStyle } from "./theme";

const App = () => {
	return (
		<>
			<GlobalStyle />
			<AppSettingsProvider.Provider>
			<Layout />
			</AppSettingsProvider.Provider>
		</>
	);
}

export default App;
