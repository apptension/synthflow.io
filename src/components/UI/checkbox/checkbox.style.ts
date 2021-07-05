import styled from "styled-components/macro";
import { Color, Transitions } from "../../../theme";

export const Container = styled.div`
  user-select: none;
  display: flex;
  align-items: center;
  padding: 1rem;
`;

export const Label = styled.label`
  cursor: pointer;
  margin-left: 4px;
  height: 16px;
  width: 16px;
`;

export const Indicator = styled.span`
  display: inline-block;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  border: .3rem solid ${Color.WHITE};
  opacity: .5;
  position: relative;
  transition: transform 80ms;
  ${Transitions.Snappy};
  transform-origin: center;

  ::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${Color.WHITE};
    opacity: 0;
    transition: opacity .1s ease-out;
  }
`;

export const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;

  &:checked + ${Indicator} {
    transform: scale(1.4);
    border-width: 0.2rem;
    opacity: 1;

    ::before {
      opacity: 1;
    }
  }
`;

