import { Button, Container } from "./controlsButton.style"
import { ReactNode } from "react";

type ControlsButtonProps = {
	onClick: () => void;
	children: ReactNode;
	isActive: boolean;
}

export const ControlsButton = ({ onClick, children, isActive }: ControlsButtonProps) => {
	return (
		<Container>
			<Button isActive={isActive} onClick={() => onClick()}>
				{children}
			</Button>
		</Container>
	)
}