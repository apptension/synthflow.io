import { useContext } from "react";
import { TransportProvider } from "../../../providers";
import { Select } from "../../UI/select";
import { AvailableBeats } from "../../../providers/transportProvider/transportProvider.types";
import { Container, Label } from "./beatsSelect.style";

const BEATS: AvailableBeats[] = [8, 16, 32];

export const BeatsSelect = () => {
	const { beats, setBeats, setCurrentBeat } = useContext(TransportProvider.Context);
	return (
		<Container>
			<Label>Beats</Label>
			<Select
				value={String(beats)}
				values={BEATS.map(beatsAmount => ({ value: String(beatsAmount), label: String(beatsAmount) }))}
				onChange={(value) => {
					setCurrentBeat(0);
					setBeats(Number(value) as AvailableBeats)
				}}
			/>
		</Container>
	)
}