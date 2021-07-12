import styled, { css } from "styled-components/macro";
import { SynthThemeProps } from "./synthesizer.types";

export const Container = styled.div<SynthThemeProps>`
  position: absolute;
  pointer-events: none;
  right: 0;
  bottom: 12vh;
  display: flex;
  width: 100%;
  justify-content: center;

  ${({ theme }) => !theme.isSynthVisible && css`
    * {
      pointer-events: none !important;
    }
  `}
`;

const ControlsPanelStyle = css`
  pointer-events: all;
  display: flex;
  flex-direction: column;
  transition: all 300ms ease-in-out;
  transition-delay: 150ms;
`

export const ControlsPanelLeft = styled.div<SynthThemeProps>`
  ${ControlsPanelStyle};

  ${({ theme }) => !theme.isSynthVisible && css`
    transform: translateX(20rem);
    filter: blur(1.6rem);
    opacity: 0;
  `} 
`;

export const ControlsPanelRight = styled.div<SynthThemeProps>`
  ${ControlsPanelStyle};

  ${({ theme }) => !theme.isSynthVisible && css`
    transform: translateX(-20rem);
    filter: blur(1.6rem);
    opacity: 0;
  `}
`;

export const PanelsRow = styled.div`
  display: flex;
  justify-content: space-between;
`;