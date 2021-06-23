import { NoteType } from "./noteInput/noteInput.component";

export const OCTAVES = [0, 1, 2, 3, 4, 5];

export const SEQUENCER_PATTERNS: Record<string,
	{
		label: string,
		octaves: Array<string>,
		pattern: Array<Array<NoteType | null>>
	}> = {
	CREEPY: {
		label: "Creepy",
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
		]
	},
	COOL: {
		label: "Cool",
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
		]
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
		]
	}
}

