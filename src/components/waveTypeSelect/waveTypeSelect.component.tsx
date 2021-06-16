import { Container, Indicator, Input, InputContainer, Label, SelectorContainer } from "./waveTypeSelect.style";
import { SinWaveIcon, SquareWaveIcon, TriangleWaveIcon } from "../../images/icons";
import { SharedStyles } from "../../theme";
import { useState } from "react";
import { WaveTypes } from "./waveTypeSelect.types";

const mappedIcons = {
	[WaveTypes.SIN]: <SinWaveIcon size={3} />,
	[WaveTypes.SQUARE]: <SquareWaveIcon size={3} />,
	[WaveTypes.TRIANGLE]: <TriangleWaveIcon size={3} />
}

type WaveTypeSelectProps = {
	onChange: (value: WaveTypes) => void;
	label: string;
}

export const WaveTypeSelect = ({ onChange, label }: WaveTypeSelectProps) => {
	const [positionIndex, setPositionIndex] = useState(0);

	return (
		<Container>
			<SharedStyles.Label htmlFor={`waveTypeSelect-${label}`}>
				{label}
			</SharedStyles.Label>
			<SelectorContainer role="radiogroup" id={`waveTypeSelect-${label}`}>
				{Object.values(WaveTypes).map((type, index) => {
					return (
						<InputContainer key={type}>
							<Input
								name={type}
								id={type}
								type="radio"
								checked={positionIndex === index}
								onChange={() => {
								setPositionIndex(index);
								onChange(type);
							}} />
							<Label htmlFor={type}>{mappedIcons[type]}</Label>
						</InputContainer>
					)
				})}
				<Indicator indexPosition={positionIndex} />
			</SelectorContainer>
		</Container>
	)
}