import styled, { css } from "styled-components/macro";
import { SynthThemeProps } from "../synthesizer/synthesizer.types";

type ContainerProps = {
	inSoloView: boolean;
} & SynthThemeProps;

export const Container = styled.div<ContainerProps>`
  position: absolute;
  height: 100vh;
  width: 100%;
  top: -5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
  transition: all 500ms ease-in-out;
  transition-property: width, opacity, transform;
	transition-delay: 200ms;

  ${({ theme }) => theme.isSynthVisible && css`
    transform: translateY(-30rem) scale(0.75);
  `};

  @media screen and (max-width: 1150px) {
    width: 250vw;
    height: 140vh;
    top: -7vh;
    right: -62vw;
    transform: translateY(0) scale(0.7);
  };
`;
