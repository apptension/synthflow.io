import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  position: relative;
  padding: 1rem 4rem;
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
  height: 7rem;
  left: 7rem;
  top: 3rem;
  margin: 1rem 0;
`;