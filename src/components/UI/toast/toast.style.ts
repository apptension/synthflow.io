import styled, { css } from "styled-components/macro";
import { FontFamily } from "../../../theme";

type ContainerProps = {
	isVisible: boolean;
}
export const Container = styled.div<ContainerProps>`
  position: absolute;
  top: -2rem;
  left: 50%;
  transform: translateX(-50%) translateY(-2rem);
  width: 45rem;
  height: 8rem;
  border-radius: 100px;
	background: linear-gradient(86.25deg, #23242D 8.19%, #373946 95.26%);
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0;
	transition: 100ms ease-out;
	transition-property: opacity, transform;
	z-index: 100;

  ${({ isVisible }) => isVisible && css`
    transform: translateX(-50%) translateY(0);
		opacity: 1;
  `}
`;


export const Text = styled.span`
  font-size: 2.2rem;
  font-family: ${FontFamily.FONT_PRIMARY};
	color: #C4C4C4;
`;