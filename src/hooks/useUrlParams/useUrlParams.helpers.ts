import { VOICES } from "../../components/synthesizer/components/oscillator/oscillator.constants";
import { NoteType } from "../../components/sequencer/noteInput/noteInput.types";
import { AvailableBeats } from "../../providers/transportProvider/transportProvider.types";

export const parseSequencerPattern = (pattern: string, beats: AvailableBeats) => {
	const flatArray = pattern.split("-").map<NoteType | null>((value) => value === "" ? null : value as NoteType);

	let newArray: (NoteType | null)[][] = [];
	for (let i = 0; i < flatArray.length; i += VOICES) {
		newArray.push(flatArray.slice(i, i + VOICES));
	}
	if (flatArray.length < VOICES * beats) return;

	return newArray;
}