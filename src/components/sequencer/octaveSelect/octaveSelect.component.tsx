import { Select } from "../../UI/select";
import { OCTAVES } from "../sequencer.constants";
import { Container, CurrentValue, Text } from "./octaveSelect.style";

type OctaveSelectProps = {
	onChange: (value: string) => void;
	value: string;
}
export const OctaveSelect = ({ value, onChange }: OctaveSelectProps) => {
	return (
		<Container>
			<CurrentValue>
				<Text>Octave</Text>
				<Text>{value}</Text>
			</CurrentValue>
			<Select
				value={value}
				values={OCTAVES.map(octave => ({ value: String(octave), label: String(octave) }))}
				onChange={(value) => onChange(value)}
			/>
		</Container>
	)
}