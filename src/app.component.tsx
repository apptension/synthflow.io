import React from "react";
import { Layout } from "./components/layout";
import { AppSettingsProvider, TransportProvider } from "./providers";
import { GlobalStyle } from "./theme";
import { BrowserRouter as Router } from "react-router-dom"
import { useShowMobileLayout } from "./hooks";
import { MobileLayout } from "./components/mobileLayout";

const App = () => {
	const showMobileLayout = useShowMobileLayout();

	return (
		<Router>
			<GlobalStyle />
			<AppSettingsProvider.Provider>
				<TransportProvider.Provider>
					{
						showMobileLayout ? (
							<MobileLayout />
						) : (
							<Layout />
						)
					}
				</TransportProvider.Provider>
			</AppSettingsProvider.Provider>
		</Router>
	);
}

export default App;
