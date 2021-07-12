import styled, { css } from "styled-components/macro";
import { Breakpoints } from "../../theme/";

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

  ${({ inSoloView }) => !inSoloView && css`
    transform: translateY(-30rem) scale(0.9);
  `};

  @media screen and (max-width: ${Breakpoints.DESKTOP_SMALL}) {
    width: 250vw;
    height: 140vh;
    top: -7vh;
    right: -62vw;
    transform: translateY(0) scale(0.7);
  };
`;
