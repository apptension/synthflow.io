import { NoteType } from "./noteInput/noteInput.component";

export const AVAILABLE_VOICES = 3;

const createEmptyNotesMatrix = () => {
	let noteMatrix: Array<Array<NoteType | null>> = [];
	for (let i = 0; i < 8; i++) {
		let beat = [];
		for (let j = 0; j < AVAILABLE_VOICES; j++) {
			beat.push(null);
		}
		noteMatrix.push(beat);
	}
	return noteMatrix;
}
export const EMPTY_NOTES_MATRIX = createEmptyNotesMatrix();