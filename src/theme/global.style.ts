import { createGlobalStyle } from "styled-components/macro";
import reset from "styled-reset";
import normalize from "styled-normalize";
import { Breakpoints, Color, FontFamily } from "./index";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  ;
  ${normalize}

  ;

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 5rem 4rem;
  }

  html, body {
    font-size: 62.5% !important;
    height: 100%;
    width: 100vw;
    position: relative;
    overflow: hidden;

    @media screen and (max-width: 1600px) {
      font-size: 55% !important;
    }

    @media screen and (max-width: 1400px) {
      font-size: 49% !important;
    }

    @media screen and (max-width: ${Breakpoints.DESKTOP_LARGE}) {
      font-size: 47% !important;
    }
  }
 
  ::selection {
    background: ${Color.HIGHLIGHT} /* WebKit/Blink Browsers */
  }

  ::-moz-selection {
    background: ${Color.HIGHLIGHT} /* Gecko Browsers */
  }
  
  #root, #root > div {
    height: 100%;
  }

  * {
    font-family: ${FontFamily.FONT_PRIMARY};
    box-sizing: border-box;
  }

  body {
    height: 100%;
    background-color: #373946;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }
`;
