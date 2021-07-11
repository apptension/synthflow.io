import styled from "styled-components/macro";
import { Color, FontWeight } from "../../../theme";

export const Container = styled.div` `;

export const Button = styled.button`
  width: 27rem;
  height: 8rem;
  background: linear-gradient(86.25deg, #30BD8B 8.19%, #8CEAD3 95.26%);
  border-radius: 100px;
  display: flex;
  align-items: center;
  padding-right: 2.7rem;
	padding-left: 3.2rem;
  justify-content: space-between;

  svg {
    path {
      fill: ${Color.DARK_GRAY};
    }
  }
`

export const Text = styled.span`
  color: ${Color.DARK_GRAY};;
  margin-right: .5rem;
  font-size: 2.2rem;
  font-weight: ${FontWeight.BOLD};
`;