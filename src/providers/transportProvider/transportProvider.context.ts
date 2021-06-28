import { createContext } from "react";
import { TransportContextType } from "./transportProvider.types";
import { WaveTypes } from "../../components/waveTypeSelect/waveTypeSelect.types";

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
}

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
	config: INITIAL_TRANSPORT_CONFIG,
	setConfig: () => undefined
})