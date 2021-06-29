import { Header } from "../UI/header"
import { Container } from "./layout.style"
import { Visualisation } from "../visualisation";
import { Synthesizer } from "../synthesizer";

export const Layout = () => {
	return (
		<Container>
			<Header />
			<Visualisation />
			<Synthesizer />
		</Container>
	)
}