import styled, { css } from "styled-components/macro";
import Color from "color";
import { Color as ThemeColor } from "../../../theme";
import { Select as SelectComponent } from '../../../theme/shared.style';

export const Container = styled.div``;

type SelectProps = {
	isNoteSelected: boolean;
}

export const Select = styled(SelectComponent)<SelectProps>`
	background: ${Color(ThemeColor.BLACK).alpha(0.1).toString()};

	:hover {
    background: ${Color(ThemeColor.BLACK).alpha(0.2).toString()};	
	}
	
	${({isNoteSelected}) => isNoteSelected && css`
    background: ${Color(ThemeColor.BLACK).alpha(0.2).toString()};
  `}
`;

export const Option = styled.option``
