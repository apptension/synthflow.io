import { Button, CenteredContainer, Container, CopiedMessage, ItemContainer, Link, Text } from "./footer.style"
import { useCopyUrlToClipboard } from "../../../hooks/useCopyUrlToClipboard";

export const Footer = () => {
	const { copyUrl, isUrlCopied } = useCopyUrlToClipboard();

	return (
		<Container>
			<ItemContainer>
				<Text>
					{"Experiment by Emil Litwiniec from  "}
				</Text>
				<Link href="https://www.apptension.com/" target="_blank">Apptension</Link>
			</ItemContainer>
			<CenteredContainer>
				{isUrlCopied ? (
					<CopiedMessage>Copied!</CopiedMessage>
				) : (
					<Button onClick={copyUrl}>
						Copy link
					</Button>
				)}
			</CenteredContainer>
			<ItemContainer>
				<Link href="https://github.com/apptension/synth-flow" target="_blank">
					Github
				</Link>
			</ItemContainer>
		</Container>
	)
}