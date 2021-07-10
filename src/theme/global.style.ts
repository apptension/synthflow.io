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
    overflow: hidden;

    @media screen and (max-width: ${Breakpoints.DESKTOP_LARGE}) {
      font-size: 50% !important;
    }
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
    background: linear-gradient(233.07deg,rgb(17 14 32 / 61%) -5.07%, rgb(87 90 112 / 63%) 71.46%) no-repeat fixed rgb(0, 0, 0);
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }
`;
