import { useContext } from "react";
import { TransportProvider } from "../../../providers";
import { AvailableBeats } from "../../../providers/transportProvider/transportProvider.types";
import { Container, Label, Input, InputContainer, SelectorContainer, LabelValue } from "./beatsSelect.style";

const BEATS: AvailableBeats[] = [8, 16, 32];

export const BeatsSelect = () => {
	const { beats, setBeats, setCurrentBeat } = useContext(TransportProvider.Context);

	return (
		<Container>
			<SelectorContainer role="radiogroup" id="beats">
				{BEATS.map((type) => {
					return (
						<InputContainer key={type}>
							<Input
								name="beats"
								id={`beats-${type}`}
								type="radio"
								value={type}
								checked={type === beats}
								onChange={() => {
									setCurrentBeat(0);
									setBeats(type)
								}}
							/>
							<Label htmlFor={`beats-${type}`}>
								<LabelValue>{type}</LabelValue>
								<LabelValue>Beats</LabelValue>
							</Label>
						</InputContainer>
					)
				})}
			</SelectorContainer>
		</Container>
	)
}