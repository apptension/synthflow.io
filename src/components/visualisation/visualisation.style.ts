import styled, { css } from "styled-components/macro";
import { Breakpoints, Transitions } from "../../theme/";

type ContainerProps = {
	inSoloView: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 60%;
  height: calc(100vh - 7rem);
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  transition: all 300ms;
  transition-property: width, opacity;
  ${Transitions.Snappy};

  ${({ inSoloView }) => inSoloView && css`
    width: 100%;
  `}
  
  @media screen and (max-width: ${Breakpoints.DESKTOP_SMALL}) {
    width: 100%;
    
    ${({ inSoloView }) => !inSoloView && css`
      width: 100%;
      opacity: 0.1;
    `}
  };
`;
