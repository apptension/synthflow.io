import styled, { css } from "styled-components/macro";
import { Breakpoints, Color } from "../../../../theme";

export const Container = styled.div`
  padding: 0 1.6rem;
`;

type ButtonProps = {
	isActive: boolean;
}

const ButtonActiveStyles = css`

  :after {
    opacity: 1;
  }

  svg {
    path {
      fill: ${Color.PRIMARY};
    }
  }
`

export const Button = styled.button<ButtonProps>`
  position: relative;
  margin: 0;
  padding: 0;
  height: 3.1rem;
  width: 3.1rem;

  :after {
    content: '';
    position: absolute;
    transition: opacity 200ms ease-in-out;
    opacity: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    height: 5.5rem;
    width: 5.5rem;
    border: 2px solid ${Color.PRIMARY};
  }

  svg {
    height: 32px;
    width: 32px;

    @media screen and (max-width: ${Breakpoints.DESKTOP_LARGE}) {
      height: 24px;
      width: 24px;
    }

    path {
      transition: fill 200ms ease-in-out;
    }
  }

  ${({ isActive }) => isActive ? css`
    ${ButtonActiveStyles};
  }
  ` : css`
    :hover {
      ${ButtonActiveStyles};

      :after {
        opacity: 0;
      }
    }
  `}


`;