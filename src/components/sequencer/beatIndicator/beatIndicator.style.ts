import styled, { css } from "styled-components/macro";

export const Container = styled.div`
  display: flex;
	pointer-events: none;
`;

type IndicatorProps = {
	isActive: boolean;
}

export const Indicator = styled.div<IndicatorProps>`
  width: 6.7rem;
	min-width: 6.7rem;
  height: 2rem;
  margin-right: .75rem;
  position: relative;

  :last-child {
    margin-right: 0;
  }

  ::after {
    content: '';
    position: absolute;
    top: 12.8rem;
    left: 50%;
    transform: translate(-50.5%, -50%);
		border: 1px solid var(--themeColorLight);
    border-radius: 13.6px;
    height: 22.2rem;
    width: 7.2rem;
    opacity: 0;
  }

  ${({ isActive }) => isActive && css`
    ::after {
      opacity: 1;
    }
  `}
`;