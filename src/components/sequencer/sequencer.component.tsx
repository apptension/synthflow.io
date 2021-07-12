import { useContext, useEffect, useMemo, useState } from "react";
import { clone, isEmpty, isNil, take, times } from "ramda";
import {
	BeatContainer,
	Container,
	NotesGrid,
	GridContainer,
	LabelsContainer,
	Label,
	SequencerContainer,
	OctaveControls,
	Controls,
	SectionTitle,
	UpperContainer,
	ControlsSection,
	ControlsWrapper,
	BigTileButton
} from "./sequencer.style"
import { NoteSelect } from "./noteSelect";
import { BeatIndicator } from "./beatIndicator";
import { TransportProvider } from "../../providers";
import { SEQUENCER_PATTERNS } from "./sequencer.constants";
import { useUrlParams } from "../../hooks";
import { UrlConfigKeys } from "../../hooks/useUrlParams/useUrlParams.types";
import { BeatsSelect } from "./beatsSelect";
import { OctaveSelect } from "./octaveSelect";
import { PresetsSelect } from "./presetsSelect";
import { getRandomPreset } from "./sequencer.helpers";

export const Sequencer = () => {
	const { currentBeat, setCurrentBeatNotes, beats, setBeats, setCurrentBeat } = useContext(TransportProvider.Context);

	const [notesMatrix, setNotesMatrix] = useState(SEQUENCER_PATTERNS["CUSTOM"].pattern);
	const [octaves, setOctaves] = useState(SEQUENCER_PATTERNS["CUSTOM"].octaves);
	const [currentPreset, setCurrentPreset] = useState<string>("CUSTOM");

	const urlConfig = useUrlParams({
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
	}, [setCurrentBeatNotes, currentBeat]);

	const handlePresetChange = (preset: string) => {
		const { pattern, octaves, beats } = SEQUENCER_PATTERNS[preset];
		setNotesMatrix(pattern);
		setOctaves(octaves);
		setBeats(beats);
		setCurrentBeat(0);
	}

	useEffect(() => {
			if (!currentPreset) return;
			handlePresetChange(currentPreset);

			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [currentPreset]
	)

	useEffect(() => {
		if (!isEmpty(urlConfig)) return;

		setTimeout(() => {
			handlePresetChange(getRandomPreset("CUSTOM"));
		}, 1000);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	useEffect(() => {
		if (beats === 8) {
			setNotesMatrix(state => take(8, state))
		} else if (beats === 16) {
			setNotesMatrix([...times(() => SEQUENCER_PATTERNS["CUSTOM"].pattern, 2).flat()])
		} else if (beats === 32) {
			setNotesMatrix([...times(() => SEQUENCER_PATTERNS["CUSTOM"].pattern, 4).flat()])
		}
	}, [beats]);

	return useMemo(() => (
		<Container>
			<ControlsSection>
				<UpperContainer>
					<BeatsSelect />
					<PresetsSelect value={currentPreset} onChange={setCurrentPreset} />
					<BigTileButton onClick={() => {
						setCurrentPreset(getRandomPreset);
					}}>Random</BigTileButton>
				</UpperContainer>
				<ControlsWrapper>

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
												return <NoteSelect
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
							</GridContainer>
						</SequencerContainer>
						<OctaveControls>
							{octaves.map((octave, index) => (
								<OctaveSelect
									key={`octave-${octave}-${index}`}
									onChange={(value) => {
										setOctaves(state => {
											const newState = [...state];
											newState[index] = value;
											return newState;
										})
									}}
									value={octaves[index]}
								/>
							))}
						</OctaveControls>
					</Controls>
				</ControlsWrapper>
				<SectionTitle>
					Sequencer
				</SectionTitle>
			</ControlsSection>
		</Container>
	), [notesMatrix, octaves, currentPreset])
}