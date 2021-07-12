import styled, { css } from "styled-components/macro";
import { Color, FontWeight } from "../../../theme";
import { SynthThemeProps } from "../../synthesizer/synthesizer.types";

export const Container = styled.div` `;

export const Button = styled.button<SynthThemeProps>`
  width: 27rem;
  height: 8rem;
  background: linear-gradient(86.25deg, #30BD8B 8.19%, #8CEAD3 95.26%);
  border-radius: 100px;
  display: flex;
  align-items: center;
  padding-right: 2.7rem;
	padding-left: 3.2rem;
  justify-content: space-between;
  transition: transform 200ms ease-in-out;

  svg {
    path {
      fill: ${Color.DARK_GRAY};
    }
  }
	
  ${({ theme }) => theme.isSynthVisible && css`
    transform: scale(0.85) translateY(3rem);
  `}
`

export const Text = styled.span`
  color: ${Color.DARK_GRAY};;
  margin-right: .5rem;
  font-size: 2.1rem;
  font-weight: ${FontWeight.BOLD};
`;