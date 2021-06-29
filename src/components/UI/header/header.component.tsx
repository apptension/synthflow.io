import { useContext } from "react";
import { not } from "ramda";
import { Container, ShowControlsButton, Logo } from "./header.style"
import { SlidersIcon } from "../../../images/icons";
import LogoSrc from "../../../images/logo.svg";
import { AppSettingsProvider } from "../../../providers";

export const Header = () => {
	const { showControls, setShowControls } = useContext(AppSettingsProvider.Context);
	return (
		<Container>
			<Logo src={LogoSrc} />
			<ShowControlsButton onClick={() => setShowControls(not)} isActive={showControls}>
				<SlidersIcon />
			</ShowControlsButton>
		</Container>
	)
}