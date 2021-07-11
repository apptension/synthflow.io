import styled from "styled-components/macro";
import { Color, FontFamily, FontWeight } from "../../../theme";

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
`;

export const SelectorContainer = styled.div`
  display: flex;
  border-radius: 4px;
  position: relative;
  user-select: none;
`;

export const Input = styled.input`
  &:not(:checked),
  &:checked {
    display: none;
  }

  &:checked + label {
    border-color: ${Color.PRIMARY};
    color: ${Color.PRIMARY};
  }

`;
export const InputContainer = styled.div`
  position: relative;
  z-index: 100;

  :not(:first-child) {
    margin-left: 1.5rem;
  }
`;

export const Label = styled.label`
  cursor: pointer;
  pointer-events: all;
  display: flex;
  flex-direction: column;
  border: 2px solid transparent;
  font-family: ${FontFamily.FONT_PRIMARY};
  color: ${Color.WHITE};
  font-weight: ${FontWeight.BOLD};
  font-size: 1.8rem;
  justify-content: center;
  align-items: center;
  height: 9rem;
  width: 9rem;
  background: rgba(55, 57, 70, 0.5);
  border-radius: 10px;
`

export const LabelValue = styled.div``;