import { Container, MorphMock } from "./visualisation.style"
import morphMock from '../../images/morph-mock.png';
import { useContext } from "react";
import { AppSettingsProvider } from "../../providers";

export const Visualisation = () => {
	const { showControls } = useContext(AppSettingsProvider.Context);

	return (
		<Container hasFullWidth={!showControls}>
			<MorphMock src={morphMock}/>
		</Container>
	)
}