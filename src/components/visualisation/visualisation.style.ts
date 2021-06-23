import styled, { css } from "styled-components/macro";
import { Transitions } from '../../theme/';

type ContainerProps = {
	hasFullWidth: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 60%;
  height: calc(100vh - 7rem);
  display: flex;
  justify-content: center;
  align-items: center;
	
	transition: width 300ms;
  ${Transitions.Snappy};

  ${({ hasFullWidth }) => hasFullWidth && css`
    width: 100%;
  `}
`;

export const MorphMock = styled.img``;