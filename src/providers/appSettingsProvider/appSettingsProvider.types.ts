import { Dispatch, SetStateAction } from "react";

export type AppSettingsContextType = {
	showControls: boolean;
	setShowControls: Dispatch<SetStateAction<boolean>>;
	isUrlCopied: boolean;
	setIsUrlCopied: Dispatch<SetStateAction<boolean>>;
}