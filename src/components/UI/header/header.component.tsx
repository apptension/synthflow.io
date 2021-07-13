import { useContext } from "react";
import { Container, Logo } from "./header.style"
import { SlidersIcon, ShareIcon } from "../../../images/icons";
import LogoSrc from "../../../images/logo.svg";
import { AppSettingsProvider, TransportProvider } from "../../../providers";
import { PlayPauseButton } from "../playPauseButton";
import { ControlsButton } from "./controlsButton";
import { not } from "ramda";
import { useCopyUrlToClipboard } from "../../../hooks";

export const Header = () => {
	const { showControls, setShowControls } = useContext(AppSettingsProvider.Context);
	const { isPlaying, toggleIsPlaying } = useContext(TransportProvider.Context);

	const { copyUrl } = useCopyUrlToClipboard();

	return (
		<Container>
			<Logo src={LogoSrc} />
			<ControlsButton onClick={toggleIsPlaying} isActive={isPlaying}>
				<PlayPauseButton isPlaying={isPlaying} />
			</ControlsButton>
			<ControlsButton onClick={() => setShowControls(not)} isActive={showControls} >
				<SlidersIcon />
			</ControlsButton>
			<ControlsButton onClick={copyUrl} isActive={false}>
				<ShareIcon />
			</ControlsButton>
		</Container>
	)
}