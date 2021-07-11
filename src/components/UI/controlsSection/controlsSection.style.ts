import styled, { css } from "styled-components/macro";
import { SharedStyles } from "../../../theme";

export const SectionName = styled.span`
  ${SharedStyles.LabelStyle};

  font-size: 1.8rem;
  width: auto;
  display: inline-block;
  padding: 0.6rem;
  opacity: .5;
  transition: opacity 300ms ease-out;
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);
	text-transform: uppercase;
`;

type ControlsContainerProps = {
	noTitle: boolean;
}
export const ControlsContainer = styled.div<ControlsContainerProps>`
  padding: 2rem 2rem 2rem 4rem;
  height: 100%;
  display: flex;
  justify-content: space-between;

  ${({ noTitle }) => noTitle && css`
    padding: 2rem 3rem;
    justify-content: space-around;
  `}
`;

type ContainerProps = {
	isShort: boolean;
}
export const Container = styled.section<ContainerProps>`
  margin: .5rem;
  height: 21.5rem;
  width: 43rem;
  position: relative;
  background-color: rgba(44, 46, 58, 0.8);
  border-radius: 8px;
	
  ${({ isShort }) => isShort && css`
    width: 20.9rem;

    ${ControlsContainer} {
      justify-content: center;
    }
  `}
`;


