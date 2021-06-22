import styled, { css } from "styled-components/macro";
import { Color as ThemeColor, FontFamily } from "../../../theme";
import Color from "color";

export const Container = styled.div``;

type SelectProps = {
	isNoteSelected: boolean;
}

export const Select = styled.select<SelectProps>`
	cursor: pointer;
	background: ${Color(ThemeColor.BLACK).alpha(0.1).toString()};
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
	
	:hover {
    background: ${Color(ThemeColor.BLACK).alpha(0.2).toString()};	
	}
	
	${({isNoteSelected}) => isNoteSelected && css`
    background: ${Color(ThemeColor.BLACK).alpha(0.2).toString()};
  `}
`;

export const Option = styled.option``