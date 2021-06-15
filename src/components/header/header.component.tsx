import { Container, Title, ShowControlsButton } from "./header.style"
import { SlidersIcon } from "../../images/icons";

export const Header = () => {
	return (
		<Container>
			<Title>WaveFlow</Title>
			<ShowControlsButton>
				<SlidersIcon />
			</ShowControlsButton>
		</Container>
	)
}