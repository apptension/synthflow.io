import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import normalize from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
  ${reset};
  ${normalize};
`;