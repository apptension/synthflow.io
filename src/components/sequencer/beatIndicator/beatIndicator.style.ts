import styled, { css } from "styled-components/macro";
import { Color } from "../../../theme";

export const Container = styled.div`
  display: flex;
`;

type IndicatorProps = {
	isActive: boolean;
}

export const Indicator = styled.div<IndicatorProps>`
  width: 3rem;
	min-width: 3rem;
  height: 2rem;
  margin-right: .5rem;
  position: relative;

  :last-child {
    margin-right: 0;
  }

  ::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${Color.WHITE};
    border-radius: 50%;
    height: .5rem;
    width: .5rem;
    opacity: 0;
  }

  ${({ isActive }) => isActive && css`
    ::after {
      opacity: 1;
    }
  `}
`;