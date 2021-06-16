import styled from "styled-components/macro";
import Color from "color";
import { Color as ThemeColor, SharedStyles } from "../../theme";

export const SectionName = styled.span`
  ${SharedStyles.LabelStyle};

  width: auto;
  display: inline-block;
  padding: 0.6rem;
  font-size: 1.9rem;
  opacity: .5;
  transition: opacity 300ms ease-out;
`;

export const ControlsContainer = styled.div`
  border: 1px solid ${Color(ThemeColor.WHITE).alpha(0.35).toString()};
  border-radius: 8px;
  padding: 1rem;
  transition: border-color 300ms ease-out;
`;

export const Container = styled.section`
  margin: 1rem;

  :hover > ${SectionName} {
    opacity: .75;
  }

  :hover > ${ControlsContainer} {
    border-color: ${Color(ThemeColor.WHITE).alpha(0.7).toString()};
  }
`;


