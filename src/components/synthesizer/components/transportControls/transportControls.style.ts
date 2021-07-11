import styled from "styled-components/macro";
import * as ControlsSectionStyles from "../../../UI/controlsSection/controlsSection.style";

export const Container = styled.div`
  ${ControlsSectionStyles.ControlsContainer} {
    justify-content: space-between;

    > {
      :first-child {
        margin-left: 3.2rem;
      }
      :last-child {
        margin-right: 4rem;
      }
    }
  }
`;