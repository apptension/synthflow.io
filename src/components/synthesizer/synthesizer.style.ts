import styled, { css } from "styled-components/macro";
import { Breakpoints, Transitions } from "../../theme/";

type ContainerProps = {
	isVisible: boolean;
}
export const Container = styled.div<ContainerProps>`
  position: absolute;
  pointer-events: none;
  grid-template-areas: "synth-controls-left synth-controls-right" "sequencer sequencer";
  right: 0;
  top: 6vh;
  transition: opacity 300ms;
  display: flex;
  width: 100%;
  justify-content: space-between;
  ${Transitions.Snappy};

  @media screen and (max-width: ${Breakpoints.MOBILE}) {
    grid-template-areas: "synth-controls-left" "synth-controls-right" "sequencer";
    top: 10rem;
    margin-right: 0;
  }

  ${({ isVisible }) => !isVisible && css`
    opacity: 0;
    pointer-events: none;
  `}
`;

export const ControlsPaneLeft = styled.div`
  pointer-events: all;
	display: flex;
	flex-direction: column;
`;

export const ControlsPaneRight = styled(ControlsPaneLeft)`
`;

export const PanelsRow = styled.div`
  display: flex;
  justify-content: space-between;
`;