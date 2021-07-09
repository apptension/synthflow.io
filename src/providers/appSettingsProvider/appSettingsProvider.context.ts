import { createContext } from "react";
import { AppSettingsContextType } from "./appSettingsProvider.types";

export const AppSettingsContext = createContext<AppSettingsContextType>({
	showControls: false,
	setShowControls: () => undefined,
	isUrlCopied: false,
	setIsUrlCopied: () => undefined
})