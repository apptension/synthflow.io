import { NoteType } from "./noteSelect/noteSelect.types";
import { AvailableBeats } from "../../providers/transportProvider/transportProvider.types";

export const OCTAVES = [0, 1, 2, 3, 4, 5];

export const SEQUENCER_PATTERNS: Record<string,
	{
		label: string,
		octaves: Array<string>,
		pattern: Array<Array<NoteType | null>>
		beats: AvailableBeats
	}> = {
	DARKNESS: {
		label: "Into the darkness",
		octaves: ["2", "1", "0"],
		pattern: [
			["F#", null, "B"],
			[null, "F#", "A#"],
			["D", null, "B"],
			[null, "C#", "A#"],
			[null, "G", "B"],
			["D#", null, "A#"],
			[null, "A#", "B"],
			[null, "C#", "A#"]
		],
		beats: 8
	},
	POSITIVE: {
		label: "Simply positive",
		octaves: ["0", "1", "2"],
		pattern: [
			["B", null, "B"],
			[null, "A", null],
			["E", null, "B"],
			["F#", null, null],
			["B", null, "B"],
			[null, "F#", null],
			[null, null, "F#"],
			[null, "C#", null]
		],
		beats: 8
	},
	QUEST: {
		label: "On the quest...",
		octaves: ["0", "1", "2"],
		pattern: [
			["G", null, "D#"],
			["D#", "A#", null],
			["C", "G", null],
			[null, "A#", null],
			["G", "D", null],
			[null, null, "D"],
			["C", "G", null],
			[null, null, null]
		],
		beats: 8
	},
	BRUTAL: {
		label: "Brutal (200BPM)",
		octaves: ["0", "0", "1"],
		pattern: [
			["E", null, null],
			[null, null, null],
			["A#", "G", null],
			["C", "F#", null],
			[null, null, null],
			["A", "G", null],
			["B", null, null],
			[null, null, null]
		],
		beats: 8
	},
	HAPPY: {
		label: "Happy & Sunny",
		octaves: ["0", "1", "2"],
		pattern: [
			["G", "G", null],
			["E", "C", null],
			[null, "F", "G"],
			["F", "C", null],
			["D", null, "A"],
			[null, null, "G"],
			["C", null, null],
			["E", null, null]
		],
		beats: 8
	},
	CUSTOM: {
		label: "Custom",
		octaves: ["0", "1", "2"],
		pattern: [
			[null, null, null],
			[null, null, null],
			[null, null, null],
			[null, null, null],
			[null, null, null],
			[null, null, null],
			[null, null, null],
			[null, null, null],
		],
		beats: 8
	}
}

export const BEATS = 8;