import styled, { css } from "styled-components/macro";
import { Transitions } from "../../theme/";

type ContainerProps = {
	isVisible: boolean;
}
export const Container = styled.div<ContainerProps>`
  position: absolute;
	display: flex;
  right: 0;
  top: 10vh;
  margin-right: 10rem;
  transition: opacity 300ms;
  ${Transitions.Snappy};

  ${({ isVisible }) => !isVisible && css`
    opacity: 0;
    pointer-events: none;
  `}
`;

export const ControlsPane = styled.div`
	width: 30rem;
`;