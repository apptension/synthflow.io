import { createContext } from "react";
import { TransportContextType } from "./transportProvider.types";
import { WaveTypes } from "../../components/UI/waveTypeSelect/waveTypeSelect.types";

export const INITIAL_TRANSPORT_CONFIG = {
	chebyshev: 0,
	noise: 0,
	masterVolume: 0,
	oscillator1: {
		waveType: WaveTypes.SIN,
		detune: 0
	},
	oscillator2: {
		waveType: WaveTypes.SIN,
		detune: 0
	},
	reverb: 0,
	filter: 0
}

export const TransportContext = createContext<TransportContextType>({
	triggerTime: 0,
	isPlaying: false,
	toggleIsPlaying: () => undefined,
	bpm: 90,
	setBpm: () => undefined,
	currentBeat: 0,
	setCurrentBeat: () => undefined,
	currentBeatNotes: [null, null, null],
	setCurrentBeatNotes: () => undefined,
	envelopeRef: undefined,
	setEnvelopeRef: () => undefined,
	config: INITIAL_TRANSPORT_CONFIG,
	setConfig: () => undefined,
	beats: 8,
	setBeats: () => undefined
})