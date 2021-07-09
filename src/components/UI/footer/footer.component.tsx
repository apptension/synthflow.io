import {
	Button,
	CenteredContainer,
	Container,
	CTAContainer,
	ItemContainer,
	Link,
	Text
} from "./footer.style"
import { useCopyUrlToClipboard } from "../../../hooks/useCopyUrlToClipboard";
import { PlayPauseCTA } from "../playPauseCTA";

export const Footer = () => {
	const { copyUrl } = useCopyUrlToClipboard();

	return (
		<Container>
			<ItemContainer>
				<Text>
					{"Experiment by Emil Litwiniec from  "}
				</Text>
				<Link href="https://www.apptension.com/" target="_blank">Apptension</Link>
			</ItemContainer>
			<CenteredContainer>
				<CTAContainer>
					<PlayPauseCTA />
				</CTAContainer>
				<Button onClick={copyUrl}>
					Copy link
				</Button>
			</CenteredContainer>
			<ItemContainer>
				<Link href="https://github.com/apptension/synth-flow" target="_blank">
					Github
				</Link>
			</ItemContainer>
		</Container>
	)
}