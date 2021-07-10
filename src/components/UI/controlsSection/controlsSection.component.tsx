import { Container, ControlsContainer, SectionName } from "./controlsSection.style"
import { ReactNode } from "react";

type ControlsSectionProps = {
	children: ReactNode;
	title?: string;
	isShort?: boolean;
}
export const ControlsSection = ({ children, title, isShort = false }: ControlsSectionProps) => {
	return (
		<Container isShort={isShort}>
			{title && <SectionName>{title}</SectionName>}
			<ControlsContainer noTitle={!title}>
				{children}
			</ControlsContainer>
		</Container>
	)
}
