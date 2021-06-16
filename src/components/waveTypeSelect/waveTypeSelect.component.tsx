import { useMemo, useState } from "react";
import { v4 as uuidV4 } from 'uuid';
import { Container, Indicator, Input, InputContainer, Label, SelectorContainer } from "./waveTypeSelect.style";
import { SinWaveIcon, SquareWaveIcon, TriangleWaveIcon } from "../../images/icons";
import { SharedStyles } from "../../theme";
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
				{Object.values(WaveTypes).map((type, index) => {
					return (
						<InputContainer key={type}>
							<Input
								name={type}
								id={`${id}-${type}`}
								type="radio"
								checked={positionIndex === index}
								onChange={() => {
								setPositionIndex(index);
								onChange(type);
							}} />
							<Label htmlFor={`${id}-${type}`}>{mappedIcons[type]}</Label>
						</InputContainer>
					)
				})}
				<Indicator indexPosition={positionIndex} />
			</SelectorContainer>
		</Container>
	)
}