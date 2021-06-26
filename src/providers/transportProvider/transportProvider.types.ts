import { Dispatch, SetStateAction } from "react";
import { AmplitudeEnvelope, Analyser, Meter } from "tone";

export type ConfigType = {
	chebyshev: number,
	noise: number,
	masterVolume: number
}

export type TransportContextType = {
	isPlaying: boolean;
	triggerTime: number;
	toggleIsPlaying: () => void;
	bpm: number;
	setBpm: Dispatch<SetStateAction<number>>;
	currentBeat: number;
	currentBeatNotes: Array<string | null>;
	setCurrentBeatNotes: Dispatch<SetStateAction<Array<string | null>>>;
	envelopeRef: AmplitudeEnvelope | undefined;
	setEnvelopeRef: Dispatch<SetStateAction<AmplitudeEnvelope| undefined>>;
	analyserRef: Analyser | undefined;
	meterRef: Meter | undefined;
	config: ConfigType;
	setConfig: Dispatch<SetStateAction<ConfigType>>;
}