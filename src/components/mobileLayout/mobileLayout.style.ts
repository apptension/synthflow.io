import styled from "styled-components/macro";
import * as SynthesiserStyles from "../synthesizer/synthesizer.style";
import { Breakpoints, Color, FontFamily } from "../../theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.8rem;
  font-family: ${FontFamily.FONT_PRIMARY};
  color: ${Color.WHITE};

  ${SynthesiserStyles.Container} {
    display: none;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
`;

export const Footer = styled.footer`
  margin-right: auto;
  @media screen and (max-width: ${Breakpoints.MOBILE_SMALL}) {
    font-size: 1.5rem;
  }
`;

export const Message = styled.span`
  user-select: none;
  pointer-events: none;
  font-family: ${FontFamily.FONT_SECONDARY};
  font-weight: 600;
  color: ${Color.WHITE};
  font-size: 11vw;
  line-height: 112%;
  margin-bottom: 13vh;
  margin-top: auto;
  z-index: 100;

  @media screen and (min-width: ${Breakpoints.MOBILE}) {
    font-size: 10rem;
  }
`;

export const Logo = styled.img``;

export const Underlined = styled.span`
  position: relative;

  ::after {
    content: '';
    position: absolute;
    height: 1.75vw;
    bottom: 3%;
    left: 2px;
    right: 0;
    background: linear-gradient(270deg, #63EAB3 0%, #1C967D 100%);

    @media screen and (min-width: ${Breakpoints.MOBILE}) {
      height: 1.3rem;
    }
  }
`;
