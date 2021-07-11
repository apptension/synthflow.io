import styled from "styled-components/macro";
import Color from "color";
import { Color as ThemeColor, FontFamily, FontWeight } from "../../../theme";
import { Select as SelectComponent } from "../../../theme/shared.style";

export const Container = styled.div`
  position: relative;
`;

type SelectProps = {
	isNoteSelected: boolean;
}

export const Select = styled(SelectComponent)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  opacity: 0;
  width: 6.7rem;
  height: 6.7rem;
  border-radius: 10px;
  color: #95969C;

  &:hover ~ * {
    background: ${Color(ThemeColor.WHITE).alpha(0.1).toString()};
  }
`;

export const Option = styled.option``

export const CurrentValue = styled.div<SelectProps>`
  width: 6.7rem;
  height: 6.7rem;
  border-radius: 10px;
  font-weight: ${FontWeight.BOLD};
  color: #95969C;
  font-size: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${FontFamily.FONT_PRIMARY};
  background: ${Color(ThemeColor.BLACK).alpha(0.3).toString()};
`;