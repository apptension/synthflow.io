import styled from "styled-components/macro";
import Color from "color";
import { Color as ThemeColor, FontFamily } from "../../../theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

export const Svg = styled.svg`
  width: 5.1rem;
  height: 5.1rem;
  transform: rotate(90deg);
  cursor: ew-resize;
`;

export const SvgCircle = styled.circle`
  stroke: ${ThemeColor.PRIMARY};
  stroke-width: 7;
  fill: transparent;
`;

export const SvgBackgroundCircle = styled(SvgCircle)`
  stroke: ${ThemeColor.WHITE};
  opacity: 0.1;
`;

export const Input = styled.input`
  pointer-events: all;
  border-radius: 10px;
  padding-bottom: 0;
  border: none;
  color: ${ThemeColor.WHITE};
  font-size: 1.8rem;
  font-family: ${FontFamily.FONT_PRIMARY};
  background-color: ${Color("#111120").alpha(0.5).toString()};
  text-align: center;
  outline: none;
  width: 6rem;
  height: 5rem;
  z-index: 100;

  ::-webkit-inner-spin-button {
    display: none;
  }

  -moz-appearance: textfield;
}
`;
