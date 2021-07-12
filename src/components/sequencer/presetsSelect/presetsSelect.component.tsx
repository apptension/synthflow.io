import { Container } from "./presetsSelect.style";
import { SEQUENCER_PATTERNS } from "../sequencer.constants";
import { Select} from "../../UI/select";
import { BigTileButton } from "../sequencer.style";

type PresetsSelectProps = {
	value: string;
	onChange: (value: string) => void;
}

export const PresetsSelect = ({ value, onChange }: PresetsSelectProps) => {
	return (
		<Container>
			<Select
				value={value}
				values={Object.entries(SEQUENCER_PATTERNS).map(([key, value]) => ({ value: key, label: value.label }))}
				onChange={onChange}
			/>
			<BigTileButton>
				Presets
			</BigTileButton>
		</Container>
	)
}