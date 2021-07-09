import styled from "styled-components/macro";

export const Container = styled.div`
  z-index: 100;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  position: relative;
`;

type ShowControlsButtonProps = {
	isActive: boolean;
}

export const ShowControlsButton = styled.button<ShowControlsButtonProps>`
  opacity: ${({ isActive }) => isActive ? "1" : "0.5"};
  margin-top: 1rem;
`;

export const Logo = styled.img`
  pointer-events: none;
  position: absolute;
  height: 3.1rem;
  left: 0;
  top: -1rem;
`;