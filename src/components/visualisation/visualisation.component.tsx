import { Container, MorphMock } from "./visualisation.style"
import morphMock from '../../images/morph-mock.png';

export const Visualisation = () => {
	return (
		<Container>
			<MorphMock src={morphMock}/>
		</Container>
	)
}