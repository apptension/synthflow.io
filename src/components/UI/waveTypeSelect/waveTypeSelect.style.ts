import styled, { css } from "styled-components/macro";
import { Color as ThemeColor } from "../../../theme";
import { SharedStyles } from "../../../theme";


export const SelectorContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  border-radius: 4px;
  position: relative;
  user-select: none;
  margin-top: 4rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
  width: 30rem;
  min-width: 30rem;

  ${SharedStyles.LabelStyle} {
    margin: 0;
  }
`;

export const Input = styled.input`
  &:not(:checked),
  &:checked {
    display: none;
  }

  width: calc(14rem / 3);
  height: 100%;
`;

export const InputContainer = styled.div`
  position: relative;
  z-index: 100;

  :not(:first-child) {
    margin-left: 4rem;
  }
`;

type LabelProps = {
	isChecked: boolean;
}

export const Label = styled.label<LabelProps>`
  cursor: pointer;
  pointer-events: all;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 6rem;
    height: 4rem;

    path {
      stroke: #95969C;
    }
  }

  ${({ isChecked }) => isChecked && css`
    svg {
      path {
        stroke: ${ThemeColor.PRIMARY};
      }
    }
  `}
`;