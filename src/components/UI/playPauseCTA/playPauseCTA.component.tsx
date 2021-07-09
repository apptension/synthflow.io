import { useContext } from "react";
import { TransportProvider } from "../../../providers";
import { PlayPauseButton } from "../playPauseButton";
import { Button, Container, Text } from "./playPauseCTA.style";

export const PlayPauseCTA = () => {
	const { isPlaying, toggleIsPlaying } = useContext(TransportProvider.Context);

	return (
		<Container>
			<Button onClick={toggleIsPlaying}>
				<PlayPauseButton isPlaying={!isPlaying} />
				<Text>{isPlaying ? 'Pause' : 'Play'} this synth</Text>
			</Button>
		</Container>
	)
}