import styled from "styled-components/macro";
import * as NoteSelectStyles from "./noteSelect/noteSelect.style";
import * as ControlsSectionStyles from "../UI/controlsSection/controlsSection.style";
import * as SelectStyles from "../UI/select/select.style";
import { Breakpoints, Color, FontFamily } from "../../theme";

export const Container = styled.div`
  grid-area: sequencer;

  ${ControlsSectionStyles.ControlsContainer} {
    padding: 2rem 4rem;

    @media screen and (max-width: ${Breakpoints.MOBILE}) {
      padding: 1rem 2rem;
    }
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

  ${NoteSelectStyles.Container} {
    margin-bottom: .5rem;

    :last-child {
      margin-bottom: 0;
    }
  }
`;

export const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  width: 33rem;

  ::-webkit-scrollbar {
    width: 1em;
    border-radius: 8px;
    height: 4px;
    cursor: pointer;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(256, 256, 256, 0.2);
    border-radius: 8px;
    height: 4px;
  }
`;

export const LabelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: max-content;
  margin-top: 2rem;
  align-self: flex-start;
`;

export const Label = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  font-family: ${FontFamily.FONT_PRIMARY};
  color: ${Color.WHITE};
  height: 2rem;
  margin-right: 1.1rem;
  user-select: none;

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
  margin-left: 2rem;
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
  align-items: flex-start;

  @media screen and (max-width: ${Breakpoints.MOBILE}) {
    flex-direction: column;
  }
`;

export const BeatNumbersContainer = styled.div`
  display: flex;
  margin: .4rem 0;
`;

export const BeatNumber = styled(Label)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  min-width: 3rem;
  opacity: .7;
  margin: 0 .5rem 0 0 !important;
`;

export const UpperContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
