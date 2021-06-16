import styled, { css } from "styled-components/macro";
import { Color as ThemeColor, FontFamily } from "./index";

export const LabelStyle = css`
  user-select: none;
  pointer-events: none;
  width: 9rem;
  text-align: right;
  font-family: ${FontFamily.FONT_PRIMARY};
  color: ${ThemeColor.WHITE};
  font-size: 1.7rem;
  margin-right: 1.1rem;
`;

export const Label = styled.label`
  ${LabelStyle};
`;