import styled from "styled-components/macro";
import * as SelectStyles from "../../UI/select/select.style";
import { Color, FontFamily, FontWeight } from "../../../theme";

export const Container = styled.div`
  display: flex;

  :not(:last-child) {
    margin-bottom: 0.75rem;
  }
   
  :hover {
    button {
      background-color: rgba(55, 57, 70, 1);
    }
  }
  
  ${SelectStyles.Container} {
    opacity: 0;
    position: absolute;
  }
`;

export const CurrentValue = styled.button`
  font-size: 1.2rem;
  font-family: ${FontFamily.FONT_PRIMARY};
  font-weight: ${FontWeight.BOLD};
  color: ${Color.WHITE};
  background-color: rgba(55, 57, 70, 0.5);
  height: 6.7rem;
  width: 6.7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  transition: background-color 150ms ease-in-out;
`;

export const Text = styled.span`
  :first-child {
    margin-bottom: .5rem;
  }
`;