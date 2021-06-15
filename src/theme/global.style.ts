import { createGlobalStyle } from "styled-components/macro";
import reset from "styled-reset";
import normalize from "styled-normalize";
import { FontFamily } from "./index";

export const GlobalStyle = createGlobalStyle`
  ${reset};
  ${normalize};

  * {
    font-family: ${FontFamily.FONT_PRIMARY};
    box-sizing: border-box;
  }

  body {
    height: 100vh;
    background: linear-gradient(233.07deg, rgba(205, 44, 44, 0.61) -5.07%, rgba(89, 110, 185, 0.63) 71.46%), #4E4D4D;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }
`;
