import { useContext, useMemo } from "react";
import { Container, Indicator } from "./beatIndicator.style";
import { TransportProvider } from "../../../providers";
import { AvailableBeats } from "../../../providers/transportProvider/transportProvider.types";

const createBeatsArray = (beats: AvailableBeats) => {
	return Array.from(new Array(beats), () => "");
}

export const BeatIndicator = () => {
	const { currentBeat, beats } = useContext(TransportProvider.Context);

	const beatsArray = useMemo(() => {
		return createBeatsArray(beats);
	}, [beats])

	return (
		<Container>
			{beatsArray.map((beat, index) => (
				<Indicator isActive={index === currentBeat} key={index} />
			))}
		</Container>
	)
}