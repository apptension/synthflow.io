import { ReactNode, useState } from "react";
import { AppSettingsContext } from "./appSettingsProvider.context";

type AppSettingsProviderProps = {
	children: ReactNode;
}

export const AppSettingsProvider = ({ children }: AppSettingsProviderProps) => {
	const [showControls, setShowControls] = useState(false);
	const [isUrlCopied, setIsUrlCopied] = useState(false);

	return (
		<AppSettingsContext.Provider value={{ showControls, setShowControls, isUrlCopied, setIsUrlCopied }}>
			{children}
		</AppSettingsContext.Provider>
	)
}

