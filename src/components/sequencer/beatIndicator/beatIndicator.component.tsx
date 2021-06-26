import { useContext } from "react";
import { Container, Indicator } from "./beatIndicator.style";
import { TransportProvider } from "../../../providers";

const BEATS = Array.from(new Array(8), () => "");

export const BeatIndicator = () => {
	const { currentBeat } = useContext(TransportProvider.Context);

	return (
		<Container>
			{BEATS.map((beat, index) => (
				<Indicator isActive={index === currentBeat} key={index} />
			))}
		</Container>
	)
}