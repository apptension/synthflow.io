import styled from "styled-components/macro";
import { Color, FontFamily } from "../../theme";

export const Container = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	padding: 10px 40px;
`;

export const Title = styled.h1`
	font-family: ${FontFamily.FONT_SECONDARY};
	color: ${Color.WHITE};
	font-size: 60px;
	pointer-events: none;
	margin: 0;
`;

export const ShowControlsButton = styled.button`
`;