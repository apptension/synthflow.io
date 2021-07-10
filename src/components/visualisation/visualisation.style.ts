import styled, { css } from "styled-components/macro";
import { Breakpoints, Transitions } from "../../theme/";

type ContainerProps = {
	inSoloView: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: absolute;
  height: 100vh;
  width: 100%;
  top: -5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
  transition: all 300ms;
  transition-property: width, opacity, transform;
  ${Transitions.Snappy};

  ${({ inSoloView }) => !inSoloView && css`
    transform: translateY(-30rem) scale(0.9);
  `};
  
  @media screen and(max-width: ${Breakpoints.DESKTOP_SMALL}) {
  width: 100%;

  ${({ inSoloView }) => !inSoloView && css`
    width: 100%;
    opacity: 0.1;
  `}
};
`;
