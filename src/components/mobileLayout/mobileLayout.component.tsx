import { Container, Footer, Header, Message, Underlined, Logo } from "./mobileLayout.style";
import { Visualisation } from "../visualisation";
import LogoSrc from "../../images/logo.svg";
import { Link, Text } from "../UI/footer/footer.style";

export const MobileLayout = () => {
	return (
		<Container>
			<Header>
				<Logo src={LogoSrc} />
				<Link href="https://github.com/apptension/synth-flow" target="_blank">
					Github
				</Link>
			</Header>
			<Visualisation />
			<Message>
				Visit this<br/>website <br/>on <Underlined>PC/Mac </Underlined><br/>for best<br/>experience.
			</Message>
			<Footer>
				<Text>
					{"Experiment by Emil Litwiniec from  "}
				</Text>
				<Link href="https://www.apptension.com/" target="_blank">Apptension</Link>
			</Footer>
		</Container>
	)
}