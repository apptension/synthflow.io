import styled from "styled-components/macro";
import * as NoteSelectStyles from "./noteSelect/noteSelect.style";
import * as ControlsSectionStyles from "../UI/controlsSection/controlsSection.style";
import { Breakpoints, Color, FontFamily, FontWeight } from "../../theme";

export const Container = styled.div`
  flex-grow: 1;
  align-self: flex-end;
  height: 44rem;
  margin: 0 .5rem .5rem .5rem;
  pointer-events: all;
  z-index: 1000;
  max-width: 81rem;

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
  margin-right: .75rem;

  :last-child {
    margin-right: 0;
  }

  ${NoteSelectStyles.Container} {
    margin-bottom: .75rem;

    :last-child {
      margin-bottom: 0;
    }
  }
`;

export const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  width: calc(32.6vw - 2.5rem);
  max-width: 60rem;
  padding: 0 4px 2rem 4px;

  ::-webkit-scrollbar {
    width: 1em;
    border-radius: 8px;
    height: 5px;
    cursor: pointer;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(94, 93, 101, 0.6);
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${Color.PRIMARY};
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
  height: 6.7rem;
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  font-family: ${FontFamily.FONT_PRIMARY};
  color: ${Color.WHITE};
  margin-right: 3rem;
  user-select: none;
  opacity: .5;

  :not(:last-child) {
    margin-bottom: 0.75rem;
  }
`;

export const SequencerContainer = styled.div`
  display: flex;
  align-items: flex-end;
`

export const OctaveControls = styled.div`
  margin-top: 2rem;
  margin-left: 1.5rem;
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

export const UpperContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ControlsSection = styled.section`
  position: relative;
  height: 100%;
  background-color: rgba(44, 46, 58, 0.8);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
`

export const SectionTitle = styled.span`
  font-family: ${FontFamily.FONT_PRIMARY};
  font-size: 1.8rem;
  color: ${Color.WHITE};
  opacity: .5;
  width: max-content;
  margin: 2rem auto 0 auto;
  text-transform: uppercase;
`;

export const ControlsWrapper = styled.div`
  height: 24rem;
`;

export const BigTileButton = styled.button`
  width: 9rem;
  height: 9rem;
  font-size: 1.2rem;
  border-radius: 10px;
  font-family: ${FontFamily.FONT_PRIMARY};
  font-weight: ${FontWeight.BOLD};
  color: ${Color.WHITE};
  display: flex;
  align-items: center;
  background-color: rgba(55, 57, 70, 0.5);
  justify-content: center;
  transition: background-color 150ms ease-in-out;

  :hover {
    background-color: rgba(55, 57, 70, 1);
  }
`;