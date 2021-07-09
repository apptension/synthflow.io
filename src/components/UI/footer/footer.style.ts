import styled, { css } from "styled-components/macro";
import { Color, FontFamily } from "../../../theme";

export const Container = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1.8rem;
  font-family: ${FontFamily.FONT_PRIMARY};
  color: ${Color.WHITE};
  align-items: flex-start;
  user-select: none;
`;

export const ItemContainer = styled.div`
`;

export const LinkStyle = css`
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 200ms ease-in-out;

  &:hover {
    opacity: 0.75;
  }
`;

export const Link = styled.a`
  ${LinkStyle};
`;

export const CenteredContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 50%;
  transform: translate(-50%);
  bottom: 0;
`;

export const Text = styled.span`
  opacity: 0.5;
`;

export const Button = styled.button`
  ${LinkStyle};
`;

export const CTAContainer = styled.div`
  margin-bottom: 4rem;
`;
