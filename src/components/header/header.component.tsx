import { Container, ShowControlsButton, Logo } from "./header.style"
import { SlidersIcon } from "../../images/icons";
import LogoSrc from "../../images/logo.svg";

export const Header = () => {
	return (
		<Container>
			<Logo src={LogoSrc} />
			<ShowControlsButton>
				<SlidersIcon />
			</ShowControlsButton>
		</Container>
	)
}