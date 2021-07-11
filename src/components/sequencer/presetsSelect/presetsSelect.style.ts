import styled from "styled-components/macro";
import * as SelectStyles from "../../UI/select/select.style";

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  margin-right: 1.5rem;

  ${SelectStyles.Select} {
    height: 100%;
    width: 100%;
    opacity: 0;
    position: absolute;
  }`;
