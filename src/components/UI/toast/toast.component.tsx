import { Container, Text } from "./toast.style"
import { useCopyUrlToClipboard } from "../../../hooks/useCopyUrlToClipboard";

export const Toast = () => {
	const { isUrlCopied } = useCopyUrlToClipboard();

	return (
		<Container isVisible={isUrlCopied}>
			<Text>
				Link has been copied to the clipboard
			</Text>
		</Container>
	)
}