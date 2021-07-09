import { Header } from "../UI/header"
import { Container } from "./layout.style"
import { Visualisation } from "../visualisation";
import { Synthesizer } from "../synthesizer";
import { Footer } from "../UI/footer";
import { Toast } from "../UI/toast";

export const Layout = () => {
	return (
		<Container>
			<Toast />
			<Header />
			<Visualisation />
			<Synthesizer />
			<Footer />
		</Container>
	)
}