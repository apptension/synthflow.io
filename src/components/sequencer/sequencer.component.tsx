import { useContext, useEffect, useState } from "react";
import { clone, isNil } from "ramda";
import { BeatContainer, Container, NotesGrid } from "./sequencer.style"
import { NoteInput } from "./noteInput";
import { ControlsSection } from "../controlsSection";
import { BeatIndicator } from "./beatIndicator";
import { TransportProvider } from "../../providers";
import { EMPTY_NOTES_MATRIX } from "./sequencer.constants";

export const Sequencer = () => {
	const [notesMatrix, setNotesMatrix] = useState(EMPTY_NOTES_MATRIX);
	const { currentBeat, setCurrentBeatNotes } = useContext(TransportProvider.Context);

	useEffect(() => {
		setCurrentBeatNotes(notesMatrix[currentBeat]);

		// should not trigger on notesMatrix change
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setCurrentBeatNotes, currentBeat])

	return (
		<Container>
			<ControlsSection title="Sequencer">
				<BeatIndicator currentBeat={currentBeat} />
				<NotesGrid>
					{notesMatrix.map((beat, beatIndex) =>
						<BeatContainer key={`beat-${beatIndex}`}>
							{beat.map((note, noteIndex) => {
								return <NoteInput
									value={isNil(note) ? "NULL" : note}
									key={`note-${noteIndex}-${beatIndex}`}
									onChange={(value) => {
										setNotesMatrix(state => {
											const newState = clone(state);
											newState[beatIndex][noteIndex] = value === "NULL" ? null : value;
											return newState;
										})
									}
									} />
							})}
						</BeatContainer>
					)}
				</NotesGrid>
			</ControlsSection>
		</Container>
	)
}