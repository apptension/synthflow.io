import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import { Container, Input, InputContainer, Label, SelectorContainer } from "./waveTypeSelect.style";
import { SawtoothWaveIcon, SinWaveIcon, SquareWaveIcon } from "../../../images/icons";
import { SharedStyles } from "../../../theme";
import { WaveTypes } from "./waveTypeSelect.types";

const mappedIcons = {
	[WaveTypes.SIN]: <SinWaveIcon size={3} />,
	[WaveTypes.SQUARE]: <SquareWaveIcon size={3} />,
	[WaveTypes.SAWTOOTH]: <SawtoothWaveIcon size={3} />
}

type WaveTypeSelectProps = {
	value: WaveTypes;
	onChange: (value: WaveTypes) => void;
	label: string;
}

export const WaveTypeSelect = ({ onChange, label, value }: WaveTypeSelectProps) => {
	const id = useMemo(() => {
		return `${uuidV4()}-${label}`;

		// should run only on mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Container>
			<SharedStyles.Label htmlFor={id}>
				{label}
			</SharedStyles.Label>
			<SelectorContainer role="radiogroup" id={id}>
				{Object.values(WaveTypes).map((type) => {
					return (
						<InputContainer key={type}>
							<Input
								name={`wave-select-${id}`}
								id={`${id}-${type}`}
								value={value}
								checked={type === value}
								type="radio"
								onChange={() => {
									onChange(type);

								}} />
							<Label
								htmlFor={`${id}-${type}`}
							>
								{mappedIcons[type]}
							</Label>
						</InputContainer>
					)
				})}
			</SelectorContainer>
		</Container>
	)
}