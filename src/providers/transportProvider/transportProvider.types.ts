import { Dispatch, SetStateAction } from "react";
import { NoteType } from "../../components/sequencer/noteInput/noteInput.component";

export type TransportContextType = {
	isPlaying: boolean;
	triggerTime: number;
	toggleIsPlaying: () => void;
	bpm: number;
	setBpm: Dispatch<SetStateAction<number>>;
	currentBeat: number;
	currentBeatNotes: Array<NoteType | null>;
	setCurrentBeatNotes: Dispatch<SetStateAction<Array<NoteType | null>>>;
}