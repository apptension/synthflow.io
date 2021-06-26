import { createContext } from "react";
import { TransportContextType } from "./transportProvider.types";


export const TransportContext = createContext<TransportContextType>({
	triggerTime: 0,
	isPlaying: false,
	toggleIsPlaying: () => undefined,
	bpm: 90,
	setBpm: () => undefined,
	currentBeat: 0,
	currentBeatNotes: [null, null, null],
	setCurrentBeatNotes: () => undefined,
	envelopeRef: undefined,
	setEnvelopeRef: () => undefined,
	analyserRef: undefined,
	meterRef: undefined,
	config: {
		chebyshev: 0,
		noise: 0,
		masterVolume: 0
	},
	setConfig: () => undefined
})