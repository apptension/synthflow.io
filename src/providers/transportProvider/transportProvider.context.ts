import { createContext } from "react";
import { TransportContextType } from "./transportProvider.types";

export const TransportContext = createContext<TransportContextType>({
	triggerTime: 0,
	isPlaying: false,
	toggleIsPlaying: () => undefined,
	bpm: 90,
	setBpm: () => undefined
})