import { createGlobalStyle } from "styled-components/macro";
import reset from "styled-reset";
import normalize from "styled-normalize";
import { Breakpoints, Color, FontFamily } from "./index";

export const GlobalStyle = createGlobalStyle`
  ${reset};
  ${normalize};

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html, body {
    font-size: 58% !important;

    @media screen and (max-width: ${Breakpoints.DESKTOP_LARGE}) {
      font-size: 50% !important;
    }
    
    overflow-x: hidden;
  }

  ::selection {
    background: ${Color.HIGHLIGHT} /* WebKit/Blink Browsers */
  }

  ::-moz-selection {
    background: ${Color.HIGHLIGHT} /* Gecko Browsers */
  }

  * {
    font-family: ${FontFamily.FONT_PRIMARY};
    box-sizing: border-box;
  }

  body {
    height: 100%;
    background: #000000 linear-gradient(233.07deg,rgb(255 97 97 / 61%) -5.07%, rgb(42 43 96 / 63%) 71.46%) no-repeat fixed;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }
`;
