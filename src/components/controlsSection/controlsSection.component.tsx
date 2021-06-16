import { Container, ControlsContainer, SectionName } from "./controlsSection.style"
import { ReactNode } from "react";

type ControlsSectionProps = {
	children: ReactNode;
	title: string;
}
export const ControlsSection = ({ children, title }: ControlsSectionProps) => {
	return (
		<Container>
			<SectionName>{title}</SectionName>
			<ControlsContainer>
				{children}
			</ControlsContainer>
		</Container>
	)
}
