import styled, { css } from "styled-components/macro";
import { Transitions } from "../../theme/";

type ContainerProps = {
	isVisible: boolean;
}
export const Container = styled.div<ContainerProps>`
  position: absolute;
	display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
	grid-template-areas: "synth-controls-left synth-controls-right" "sequencer sequencer";
  right: 0;
  top: 6vh;
  margin-right: 10rem;
  transition: opacity 300ms;
  ${Transitions.Snappy};

  ${({ isVisible }) => !isVisible && css`
    opacity: 0;
    pointer-events: none;
  `}
`;

export const ControlsPaneLeft = styled.div`
	grid-area: synth-controls-left;
	width: 30rem;
`;

export const ControlsPaneRight = styled(ControlsPaneLeft)`
	grid-area: synth-controls-right;
`;