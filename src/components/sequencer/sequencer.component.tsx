import { useContext, useEffect, useMemo, useState } from "react";
import { clone, isNil, take, times } from "ramda";
import {
	BeatContainer,
	Container,
	NotesGrid,
	GridContainer,
	LabelsContainer,
	Label,
	SequencerContainer,
	OctaveControls,
	Octave,
	PresetsContainer,
	Controls,
	BeatNumbersContainer,
	BeatNumber,
	UpperContainer
} from "./sequencer.style"
import { NoteInput } from "./noteInput";
import { ControlsSection } from "../UI/controlsSection";
import { BeatIndicator } from "./beatIndicator";
import { TransportProvider } from "../../providers";
import { OCTAVES, SEQUENCER_PATTERNS } from "./sequencer.constants";
import { Select } from "../UI/select";
import { useUrlParams } from "../../hooks";
import { UrlConfigKeys } from "../../hooks/useUrlParams/useUrlParams.types";
import { BeatsSwitcher } from "./beatsSwitcher";

export const Sequencer = () => {
	const [notesMatrix, setNotesMatrix] = useState(SEQUENCER_PATTERNS["CUSTOM"].pattern);
	const { currentBeat, setCurrentBeatNotes, beats, setBeats, setCurrentBeat } = useContext(TransportProvider.Context);
	const [octaves, setOctaves] = useState(["1", "1", "1"]);
	const [currentPreset, setCurrentPreset] = useState<string>("CUSTOM");

	useUrlParams({
		[UrlConfigKeys.SEQUENCER_PATTERN]: {
			value: notesMatrix,
			setter: setNotesMatrix
		},
		[UrlConfigKeys.SEQUENCER_OCTAVES]: {
			value: octaves,
			setter: setOctaves
		},
		[UrlConfigKeys.SEQUENCER_BEATS]: {
			value: beats,
			setter: setBeats
		}
	})

	useEffect(() => {
		const withOctaves = [...notesMatrix[currentBeat]].map((note, index) => isNil(note) ? null : `${note}${octaves[index]}`)
		setCurrentBeatNotes(withOctaves);

		// should not trigger on notesMatrix change
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setCurrentBeatNotes, currentBeat])

	useEffect(() => {
			if (!currentPreset) return;
			const { pattern, octaves, beats } = SEQUENCER_PATTERNS[currentPreset];
			setNotesMatrix(pattern);
			setOctaves(octaves);
			setBeats(beats);
			setCurrentBeat(0);

			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [currentPreset]
	)

	useEffect(() => {
		if (beats === 8) {
			setNotesMatrix(state => take(8, state))
		} else if (beats === 16) {
			setNotesMatrix([...times(() => SEQUENCER_PATTERNS["CUSTOM"].pattern, 2).flat()])
		} else if (beats === 32) {
			setNotesMatrix([...times(() => SEQUENCER_PATTERNS["CUSTOM"].pattern, 4).flat()])
		}
	}, [beats])

	return useMemo(() => (
		<Container>
			<ControlsSection title="Sequencer">
				<UpperContainer>
				<BeatsSwitcher />
				<PresetsContainer>
					<Label>Patterns</Label>
					<Select
						value={currentPreset}
						values={Object.entries(SEQUENCER_PATTERNS).map(([key, value]) => ({ value: key, label: value.label }))}
						onChange={(value) => setCurrentPreset(value)}
					/>
				</PresetsContainer>
				</UpperContainer>
				<Controls>
					<SequencerContainer>
						<LabelsContainer>
							<Label>Voice 1</Label>
							<Label>Voice 2</Label>
							<Label>Voice 3</Label>
						</LabelsContainer>
						<GridContainer>
							<BeatIndicator />
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
							<BeatNumbersContainer>
								{notesMatrix.map((_, index) => (
									<BeatNumber key={index + 1}>{index + 1}</BeatNumber>
								))}
							</BeatNumbersContainer>
						</GridContainer>
					</SequencerContainer>
					<OctaveControls>
						{octaves.map((octave, index) => (
							<Octave key={`octave-${octave}-${index}`}>
								<Label>Octave</Label>
								<Select
									value={octaves[index]}
									values={OCTAVES.map(octave => ({ value: String(octave), label: String(octave) }))}
									onChange={(value) => {
										setOctaves(state => {
											const newState = [...state];
											newState[index] = value;
											return newState;
										})
									}}
								/>
							</Octave>
						))}
					</OctaveControls>
				</Controls>
			</ControlsSection>
		</Container>
	), [notesMatrix, octaves, currentPreset])
}