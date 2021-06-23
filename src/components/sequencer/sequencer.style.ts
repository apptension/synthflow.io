import styled from "styled-components/macro";
import * as NoteInputStyles from "./noteInput/noteInput.style";
import * as ControlsSectionStyles from "../controlsSection/controlsSection.style";
import * as SelectStyles from "../select/select.style";
import { Color, FontFamily } from "../../theme";

export const Container = styled.div`
  grid-area: sequencer;

  ${ControlsSectionStyles.ControlsContainer} {
    padding: 2rem 4rem;
  }
`;

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

export const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LabelsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  font-family: ${FontFamily.FONT_PRIMARY};
  color: ${Color.WHITE};
  height: 2rem;
  margin-right: 1.1rem;

  :not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;


export const SequencerContainer = styled.div`
  display: flex;
  align-items: flex-end;
`

export const OctaveControls = styled.div`
  margin-top: 2rem;

`;

export const Octave = styled.div`
  display: flex;

  :last-child {
    ${Label} {
      margin-bottom: 0;
    }
  }

  ${Label} {
    width: 5rem;
    font-size: 1.6rem;
  }
`;

export const PresetsContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  ${SelectStyles.Select} {
    width: 20rem;
    text-align: right;
    text-align-last: right;
    padding-right: 1rem;
  }
`;

export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;