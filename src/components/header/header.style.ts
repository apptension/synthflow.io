import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 1rem 4rem;
`;

type ShowControlsButtonProps = {
	isActive: boolean;
}

export const ShowControlsButton = styled.button<ShowControlsButtonProps>`
  opacity: ${({ isActive }) => isActive ? "1" : "0.5"};
`;

export const Logo = styled.img`
  margin: 1rem 0;
`;