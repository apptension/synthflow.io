import styled from "styled-components/macro";
import { SharedStyles } from "../../../theme";

export const SelectorContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  border-radius: 4px;
  position: relative;
  user-select: none;
  margin-top: 4rem;
`;

export const Label = styled.label`
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
      transition: all 150ms ease-in-out;
      stroke: #95969C;
    }
  }

`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
  width: 30rem;
  min-width: 30rem;
  opacity: 1 !important;

  ${SharedStyles.LabelStyle} {
    margin: 0;
  }
`;

export const Input = styled.input`
  &:not(:checked),
  &:checked {
    display: none;
  }

  &:checked + ${Label} {
    svg {
      path {
        stroke: var(--themeColorLight);
      }
    }
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
