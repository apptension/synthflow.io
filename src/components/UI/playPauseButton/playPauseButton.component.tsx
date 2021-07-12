import { Container } from "./playPauseButton.style"
import { PauseIcon, PlayIcon } from "../../../images/icons";

type PlayPauseButtonProps = {
	isPlaying: boolean;
}

export const PlayPauseButton = ({ isPlaying }: PlayPauseButtonProps) => {
	return (
		<Container>
			{isPlaying ? (
				<PauseIcon />
			) : (
				<PlayIcon />
			)}
		</Container>
	)
}