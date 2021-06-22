import styled from "styled-components/macro";
import * as NoteInputStyles from "./noteInput/noteInput.style";

export const Container = styled.div` `;

export const NotesGrid = styled.div`
  display: flex;
`;

export const BeatContainer = styled.div`
  margin-right: .5rem;

  :last-child {
    margin-right: 0;
  }

  ${NoteInputStyles.Container} {
    margin-bottom: .5rem;

    :last-child {
      margin-bottom: 0;
    }
  }
`;