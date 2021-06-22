import { Container, Indicator } from "./beatIndicator.style";

type BeatIndicatorProps = {
	currentBeat: number;
}

const BEATS = Array.from(new Array(8), () => "");

export const BeatIndicator = ({ currentBeat }: BeatIndicatorProps) => {
	return (
		<Container>
			{BEATS.map((beat, index) => (
				<Indicator isActive={index === currentBeat} key={index} />
			))}
		</Container>
	)
}