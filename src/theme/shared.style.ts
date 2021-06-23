import styled, { css } from "styled-components/macro";
import { Color as ThemeColor, FontFamily } from "./index";
import Color from "color";

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

export const Select = styled.select`
  cursor: pointer;
  background: ${Color(ThemeColor.BLACK).alpha(0.2).toString()};
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: '';
  font-family: ${FontFamily.FONT_PRIMARY};
  color: ${ThemeColor.WHITE};
  font-size: 1.6rem;
  border-radius: 4px;
  width: 3rem;
  height: 2rem;
  text-align: center;
  text-align-last: center;
`;
