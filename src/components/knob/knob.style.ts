import styled from "styled-components/macro";
import Color from "color";
import { Color as ThemeColor, FontFamily } from "../../theme";

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

export const Svg = styled.svg`
  width: 2.6rem;
  height: 2.6rem;
  transform: rotate(90deg);
  cursor: ew-resize;
`;

export const SvgCircle = styled.circle`
  stroke: ${ThemeColor.WHITE};
  stroke-width: 4;
  fill: transparent;
`;

export const SvgBackgroundCircle = styled(SvgCircle)`
  opacity: 0.3;
`;

export const Input = styled.input`
  margin-left: 1.1rem;
  padding-right: 0.4rem;
  border-radius: 4px;
  border: none;
  color: ${ThemeColor.WHITE};
  font-size: 1.6rem;
  font-family: ${FontFamily.FONT_SECONDARY};
  background-color: ${Color(ThemeColor.BLACK).alpha(0.2).toString()};
  text-align: right;
  outline: none;
  width: 5rem;
  height: 2rem;


  ::-webkit-inner-spin-button {
    display: none;
  }

  -moz-appearance: textfield;
}
`;

export const Label = styled.label`
  user-select: none;
	pointer-events: none;
  width: 7rem;
  text-align: right;
  font-family: ${FontFamily.FONT_PRIMARY};
  color: ${ThemeColor.WHITE};
  font-size: 1.7rem;
  margin-right: 1.1rem;
`;