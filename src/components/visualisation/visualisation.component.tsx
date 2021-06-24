import { Container } from "./visualisation.style"
import { useContext, useRef } from "react";
import { AppSettingsProvider } from "../../providers";
import { useRenderer } from "./visualisation.hooks";

export const Visualisation = () => {
	const { showControls } = useContext(AppSettingsProvider.Context);
	const mountRef = useRef<HTMLDivElement>(null);
	useRenderer(mountRef);

	return (
		<Container hasFullWidth={!showControls} ref={mountRef} />
	)
}