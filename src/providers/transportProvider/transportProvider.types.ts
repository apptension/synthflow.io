import { Dispatch, SetStateAction } from "react";
import { AmplitudeEnvelope } from "tone";
import { WaveTypes } from "../../components/UI/waveTypeSelect/waveTypeSelect.types";

export type OscillatorConfig = {
	waveType: WaveTypes,
	detune: number
}
export type ConfigType = {
	chebyshev: number,
	noise: number,
	masterVolume: number,
	oscillator1: OscillatorConfig,
	oscillator2: OscillatorConfig,
	reverb: number;
	filter: number;
}

export type AvailableBeats = 8 | 16 | 32;

export type TransportContextType = {
	isPlaying: boolean;
	triggerTime: number;
	toggleIsPlaying: () => void;
	bpm: number;
	setBpm: Dispatch<SetStateAction<number>>;
	currentBeat: number;
	setCurrentBeat: Dispatch<SetStateAction<number>>;
	currentBeatNotes: Array<string | null>;
	setCurrentBeatNotes: Dispatch<SetStateAction<Array<string | null>>>;
	envelopeRef: AmplitudeEnvelope | undefined;
	setEnvelopeRef: Dispatch<SetStateAction<AmplitudeEnvelope| undefined>>;
	config: ConfigType;
	setConfig: Dispatch<SetStateAction<ConfigType>>;
	beats: AvailableBeats;
	setBeats: Dispatch<SetStateAction<AvailableBeats>>
}