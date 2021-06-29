import styled from "styled-components/macro";
import Color from "color";
import { Color as ThemeColor, Transitions } from "../../../theme";

export const SelectorContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: ${Color(ThemeColor.BLACK).alpha(0.2).toString()};
  border-radius: 4px;
  width: 14rem;
  position: relative;
  user-select: none;
`;

export const Container = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
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
`;

export const Label = styled.label`
  cursor: pointer;
  width: calc(14rem / 3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

type IndicatorProps = {
	indexPosition: number;
}

export const Indicator = styled.div<IndicatorProps>`
  transition: transform 300ms;
  ${Transitions.Snappy};
  position: absolute;
  background-color: ${Color(ThemeColor.BLACK).alpha(0.3).toString()};
  border-radius: 4px;
  height: 100%;
  width: calc(14rem / 3);
  left: 0;
  transform: translateX(${({ indexPosition }) => `calc(14rem / 3 * ${indexPosition})`});
  z-index: 0;
`;